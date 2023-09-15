import {Component, ElementRef, OnInit} from '@angular/core';
import * as echarts from "echarts";
import $ from 'jquery';
import {JournalisationService} from "../services/journalisation.service";
import {TokenService} from "../Authentification/token.service";
@Component({
  selector: 'app-statistiques',
  templateUrl: './statistiques.component.html',
  styleUrls: ['./statistiques.component.css']
})
export class StatistiquesComponent implements OnInit {
  base = +new Date(1968, 9, 3);
  oneDay = 24 * 3600 * 1000;
  date = [];
  data = [];
   colors = ['#5470C6', '#EE6666'];
  id :number;
  optionLine = {
    color: this.colors,

    tooltip: {
      trigger: 'none',
      axisPointer: {
        type: 'cross'
      }
    },
    legend: {},
    grid: {
      top: 70,
      bottom: 50
    },
    xAxis: [
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: this.colors[1]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },

        // prettier-ignore
        data: ['2016-1', '2016-2', '2016-3', '2016-4', '2016-5', '2016-6', '2016-7', '2016-8', '2016-9', '2016-10', '2016-11', '2016-12']
      },
      {
        type: 'category',
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          onZero: false,
          lineStyle: {
            color: this.colors[0]
          }
        },
        axisPointer: {
          label: {
            formatter: function (params: any) {
              return (
                'Precipitation  ' +
                params.value +
                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
              );
            }
          }
        },

        // prettier-ignore
        data: ['2015-1', '2015-2', '2015-3', '2015-4', '2015-5', '2015-6', '2015-7', '2015-8', '2015-9', '2015-10', '2015-11', '2015-12']
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'Precipitation(2015)',
        type: 'line',
        xAxisIndex: 1,
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [
          2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3
        ]
      },
      {
        name: 'Precipitation(2016)',
        type: 'line',
        smooth: true,
        emphasis: {
          focus: 'series'
        },
        data: [
          3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7
        ]
      }
    ]
  };
  constructor(private elm: ElementRef,
              private tokenService:TokenService,
              private journalisationService:JournalisationService) {
    this.id = Number(this.tokenService.getId());

  }
  option = {
    title: {
      text: 'Referer of a Website',
      subtext: 'Fake Data',
      left: 'center'
    },
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'vertical',
      left: 'left'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ]
  };
  ngOnInit() {
    let barChart = echarts.init($(this.elm.nativeElement).find('#barChart')[0]);
    this.journalisationService.getNbreHeure(this.id).subscribe(response=>{
      response.forEach(item=>{
        const dateItem = new Date(item.date)
        this.date.push([dateItem.getFullYear(), dateItem.getMonth() + 1, dateItem.getDate()].join('/'));
        this.data.push(item.nbr);
      })

    barChart.setOption({
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
        max:12
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
      console.log(this.date)
      console.log(this.data)
    });
    let piChart = echarts.init($(this.elm.nativeElement).find('#piChart')[0]);
    piChart.setOption(this.option);
    let lineChart = echarts.init($(this.elm.nativeElement).find('#lineChart')[0]);
    lineChart.setOption(this.optionLine);
  }

}
