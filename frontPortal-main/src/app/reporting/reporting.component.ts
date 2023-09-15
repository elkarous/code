import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AccountService} from "../services/account.service";
import {UserEntity} from "../../models/userEntity";
import * as echarts from "echarts";
import $ from 'jquery';
import {JournalisationService} from "../services/journalisation.service";
import {formatDate} from "@angular/common";
import {MatDatepickerInputEvent} from "@angular/material/datepicker";
import {FormControl} from "@angular/forms";
import {EChartsType} from "echarts";


@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {
  time = new FormControl();
  id: number
  employee = new UserEntity();
  total = 0;
  totalH = 0
  date = [];
  data = [];
  percent = 0;
  curentDate = new Date();
  dateString = ''
   formattedDate: string;
   barChart: EChartsType;

  constructor(private activatedRoute: ActivatedRoute,
              private journalisationService: JournalisationService,
              private elm: ElementRef,
              private accountService: AccountService) {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.time.valueChanges.subscribe(response=>{
      this.curentDate =response;
      this.totalH = this.joursDeTravailDansMois(this.curentDate.getMonth() + 1, this.curentDate.getFullYear()) * 8;
      this.getDataChart(response);
      this.getWorkHours(response)
    })
    this.time.setValue(this.curentDate);

    this.accountService.getById(this.id).subscribe((response) => {
      this.employee = response
    })
  }

  ngOnInit(): void {
    this.barChart = echarts.init($(this.elm.nativeElement).find('#barChart')[0]);
    this.totalH = this.joursDeTravailDansMois(this.curentDate.getMonth() + 1, this.curentDate.getFullYear()) * 8;

  }

  joursDeTravailDansMois(mois, annee) {
    let joursDansMois = new Date(annee, mois, 0).getDate();
    if (mois === new Date().getMonth()+1) {
      joursDansMois = this.getDifferenceBetweenTwoDate();
    }
    let joursDeTravail = 0;

    for (let jour = 1; jour <= joursDansMois; jour++) {
      const date = new Date(annee, mois - 1, jour);
      const jourDeSemaine = date.getDay();

      if (jourDeSemaine !== 0 && jourDeSemaine !== 6) {
        joursDeTravail++;
      }
    }

    return joursDeTravail;
  }

  getDifferenceBetweenTwoDate(): number {
    const fistDay = new Date(new Date().getFullYear(), new Date().getMonth() , 0);
    const lastDay = new Date(new Date().getFullYear(), new Date().getMonth() , new Date().getDate());
    const diff = lastDay.getTime() - fistDay.getTime();
    return Math.round(diff / (1000 * 3600 * 24));
  }

  getWorkHours(response){
    this.journalisationService.getNbreHeureTotal(this.id, new Date(response)).subscribe(response => {
      this.total = response
      this.percent = Number(((this.total * 100) / this.totalH).toFixed(2));
    });
  }

getDataChart(response){
  this.date =[];
  this.data =[];
  this.journalisationService.getNbreHeure(this.id,new Date(response)).subscribe(response => {
    response.forEach(item => {
      this.date.push(item.date);
      this.data.push(item.nbr);
    })

    this.barChart.setOption({
      color: '#67c798',
      tooltip: {
        trigger: 'axis',
      },
      title: {
        left: 'center',
        text: 'Nombre heure de travail par jour',
      },
      toolbox: {
        feature: {
          restore: {
            title: 'restore'
          },
          saveAsImage: {
            title: 'save'
          }
        }
      },
      xAxis: {
        type: 'category',
        data: this.date
      },
      yAxis: {
        type: 'value',
        max: 12
      },
      series: [
        {
          name: 'Heures',
          type: 'bar',
          smooth: true,
          symbol: 'none',
          sampling: 'average',
          data: this.data
        }
      ]
    })
  });
}


}
