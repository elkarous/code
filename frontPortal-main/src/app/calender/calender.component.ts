import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";

import {formatDate} from "@angular/common";
import {AccountService} from "../services/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Patient} from "../../models/Patient";
import {PatientService} from "../services/patient.service";
import {Activite} from "../../models/Activite";
import {Tache} from "../../models/Tache";
import {ProjectService} from "../services/project.service";
import { Calendar } from '@fullcalendar/core'; // Import the core FullCalendar library
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import {JournalisationService} from "../services/journalisation.service";
import {JournalisationT} from "../../models/JournalisationT";
import {TacheService} from "../services/tache.service"; // a plugin!
@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  Events = [];
  displayModal = false;
  RendezvousS: JournalisationT[] = [];
  calendarOptions: CalendarOptions;
  rdvId: number;
  medecinId: number
  modeEdit = false;
  patient: string;
  date: Date;
  debut: Date;
  journalisationT = new JournalisationT();
  ajoutJournalisationTFormGroup: FormGroup;
  modifierRDVform: FormGroup;
  taches: Tache[] = [];
  heures = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  dateStart: Date;
  dateEnd: Date;
  heurStart = '';
  heurEnd = '';
  id: number;
  typeJournalisationT = 'Projet';
  taskTypes = ['Projet', 'Normale']
  headerText = '';
  @ViewChild('calendar') calendarComponent: any;
   calendar: Calendar;

  constructor(private journalisationService: JournalisationService,
              private userService: AccountService,
              private tacheService: TacheService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private patientService: PatientService) {
  }

  ngAfterViewInit() {
    this.Events = []
    this.getAllRdv();
    // Initialize FullCalendar with plugins
     this.calendar = new Calendar(document.getElementById('calendar'), {
      // or 'timeGridDay', 'timeGridThreeDay', etc.
      // other configuration options
    });

    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today dayGridMonth,timeGridWeek',

      },
      themeSystem: 'bootstrap',
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      locale: 'fr',
      selectable: true,
      plugins: [dayGridPlugin, timeGridPlugin],
      initialView: 'timeGridWeek',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      height: 600,
      editable: true
    };
    // @ts-ignore
    this.calendar.setOption(this.calendarOptions);
    this.calendar.render();
  }

  ngOnInit(): void {
    this.ajoutJournalisationTFormGroup = this.fb.group({
      projet: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      nomT: ['', Validators.required],
      prenom: ['', Validators.required],
      etat: ['', Validators.required],
      disc: ['', Validators.required],
      heurEnd: ['', Validators.required],
      heurStart: ['', Validators.required],
    })
    this.modifierRDVform = this.fb.group({
      patientEmail: ['', Validators.required],
      user: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required]
    })
    this.getAllRdv();
    this.getAllProject();
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today dayGridMonth,timeGridWeek,timeGridDay',

      },
      themeSystem: 'bootstrap',
      buttonText: {
        today: 'Aujourd\'hui',
        month: 'Mois',
        week: 'Semaine',
        day: 'Jour',
        list: 'Liste'
      },
      locale: 'fr',
      selectable: true,
      plugins: [timeGridPlugin],
      initialView: 'timeGridWeek',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      editable: true
    };
    // @ts-ignore
    this.calendar.setOption(this.calendarOptions);
    this.calendar.render();
  }

  onDateClick(res) {
    this.modeEdit = false;
    this.headerText = 'Ajouter journalisation'
    this.displayModal = true;
    this.dateStart = res.date;
    this.dateEnd = res.date;
  }

  onEventClick(info) {
    this.modeEdit = true;
    this.headerText = 'Modifier journalisation'
    this.journalisationService.getbyid(info.event.id).subscribe(data => {
      this.journalisationT = data;
      this.heurEnd = this.getTime(new Date(data.dateFin));
      this.heurStart = this.getTime(new Date(data.dateDebut));
      this.ajoutJournalisationTFormGroup.patchValue(data);
      this.dateStart =new  Date(data.dateDebut);
      this.dateEnd = new Date(data.dateFin);

      this.displayModal = true;
    })
  }
  eventColor(event): string {
    return event === 'new'?'#0c4d64':'blue'
  }
  private getTime(date: Date): string {
    const currentHour = date.getHours();
    let currentMinute:any = date.getMinutes();
    if (currentMinute === 0) {
      currentMinute = '00'
    }
    return currentHour + ':' + currentMinute
  }

  getAllRdv() {
    this.journalisationService.getAll().subscribe(data => {
      this.RendezvousS = data;
      this.calendarOptions.events = [];
      for (let rdv of this.RendezvousS) {
        let daystart = formatDate(rdv.dateDebut, 'yyyy-MM-dd HH:mm:ss', 'en_Us');
        let dayFin = formatDate(rdv.dateFin, 'yyyy-MM-dd HH:mm:ss', 'en_Us');
        let start = formatDate(rdv.dateDebut, 'HH:mm', 'en_Fr');
        let event = {
          id: rdv.idJT,
          title: rdv.description,
          start: daystart.toString(),
          end: dayFin.toString(),
          extendedProps: {
            user: 1,
            date: start.toString()
          }

        };
        this.Events.push(event);
        this.calendarOptions.events = this.Events;
      }
    })
  }

  modifier() {
    this.ajoutJournalisationTFormGroup.get('dateDebut').value;
    let formattedDtStart = formatDate(this.dateStart, 'yyyy-MM-dd', 'en_FR');
    let formattedDtEnd = formatDate(this.dateEnd, 'yyyy-MM-dd', 'en_FR');
    let hr = new Date(formattedDtStart + 'T' + this.heurStart + ':00');
    let hrEnd = new Date(formattedDtEnd + 'T' + this.heurEnd + ':00');
    let journalisationT = new JournalisationT();
    const project = this.taches.find(p => p.idT === Number(this.ajoutJournalisationTFormGroup.get('projet').value))
    journalisationT.tache = project;
    journalisationT.description = this.ajoutJournalisationTFormGroup.get('disc').value;
    journalisationT.dateDebut = hr;
    journalisationT.dateFin = hrEnd;
    this.journalisationService.updateJournalisationT(journalisationT,this.journalisationT.idJT).subscribe(() => {
        this.toastr.success('ajout avec succes')
        this.ngAfterViewInit();
        this.ajoutJournalisationTFormGroup.reset()
      },
      () => this.toastr.error('rendez-vous deja pris'))

      this.ajoutJournalisationTFormGroup.reset()

  }


  getAllProject() {
    this.tacheService.getAll().subscribe(data => {
      this.taches = data;
    });
  }

  ajoutJournalisationT() {
    let formattedDtStart = formatDate(this.dateStart, 'yyyy-MM-dd', 'en_FR');
    let formattedDtEnd = formatDate(this.dateEnd, 'yyyy-MM-dd', 'en_FR');
    let hr = new Date(formattedDtStart + 'T' + this.heurStart + ':00');
    let hrEnd = new Date(formattedDtEnd + 'T' + this.heurEnd + ':00');
    let journalisationT = new JournalisationT();
    const project = this.taches.find(p => p.idT === Number(this.ajoutJournalisationTFormGroup.get('projet').value))
    journalisationT.tache = project;
    journalisationT.description = this.ajoutJournalisationTFormGroup.get('disc').value;
    journalisationT.dateDebut = hr;
    journalisationT.dateFin = hrEnd;
    this.journalisationService.ajouterJournalisationT(journalisationT).subscribe(() => {
        this.toastr.success('ajout avec succes')
        this.ngAfterViewInit();
        this.ajoutJournalisationTFormGroup.reset()
      },
      () => this.toastr.error('rendez-vous deja pris'))
    this.ajoutJournalisationTFormGroup.reset();
  }


  dateStartBlur(event) {
    this.dateStart = new Date(event.srcElement.value);

  }

  dateEndBlur(event) {
    this.dateEnd = new Date(event.srcElement.value);
  }
}
