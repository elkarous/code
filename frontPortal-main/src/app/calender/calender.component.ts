import {Component, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";

import {formatDate} from "@angular/common";
import {AccountService} from "../services/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Tache} from "../../models/Tache";
import {Calendar} from '@fullcalendar/core'; // Import the core FullCalendar library
import timeGridPlugin from '@fullcalendar/timegrid';
import dayGridPlugin from '@fullcalendar/daygrid';
import {JournalisationService} from "../services/journalisation.service";
import {JournalisationT} from "../../models/JournalisationT";
import {TacheService} from "../services/tache.service";
import {JournalisationNDService} from "../services/journalisationND.service";
import {Activite} from "../../models/Activite";
import {ProjectService} from "../services/project.service";
import {JournalisationND} from "../../models/JournalisationND";
import {TokenService} from "../Authentification/token.service";
import {UserEntity} from "../../models/userEntity";
import {Heures} from "../../models/heures";

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  Events = [];
  displayModal = false;
  calendarOptions: CalendarOptions;
  modeEdit = false;
  date: Date;
  formGroup: FormGroup;
  taches: Tache[] = [];
  activites: Activite[] = [];
  heures = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  dateStart: Date;
  dateEnd: Date;
  heurStart = '';
  heurEnd = '';
  id: number;
  userId: number;
  typeJournalisationT = 'Tache';
  taskTypes = ['Tache', 'Normale']
  headerText = '';
  @ViewChild('calendar') calendarComponent: any;
  calendar: Calendar;
  connectedUser :UserEntity;

  constructor(private journalisationService: JournalisationService,
              private journalisationNDService: JournalisationNDService,
              private userService: AccountService,
              private tacheService: TacheService,
              private tokenService:TokenService,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private toastr: ToastrService) {
    this.connectedUser = tokenService.getUser();
    this.userId = this.connectedUser.id;
  }

  ngAfterViewInit() {
    this.Events = []
    this.getAllEvent();
    // Initialize FullCalendar with plugins
    this.calendar = new Calendar(document.getElementById('calendar'));

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
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      height: 600,
      editable: true
    };
    // @ts-ignore
    this.calendar.setOption(this.calendarOptions);
    this.calendar.render();
  }

  setColor(type: string): string {
    return type === 'JournalisationT' ? '#396caa' : '#d55959'
  }

  ngOnInit(): void {
    this.getAllEvent();
    this.getAllTaches();
    this.getAllActivities();
    // Initialize FullCalendar with plugins
    this.calendar = new Calendar(document.getElementById('calendar'));
    this.formGroup = this.fb.group({
      tache: ['',],
      activiteND: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      nomT: ['', Validators.required],
      type: [''],
      prenom: ['', Validators.required],
      etat: ['', Validators.required],
      description: ['', Validators.required],
      heurEnd: ['', Validators.required],
      heurStart: ['', Validators.required],
    })
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
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      editable: true
    };
    // @ts-ignore
    this.calendar.setOption(this.calendarOptions);
    this.calendar.render();
  }

  onDateClick(res) {
    this.formGroup.reset(undefined)
    this.modeEdit = false;
    this.headerText = 'Ajouter journalisation'
    this.displayModal = true;
    this.dateStart = res.date;
    this.dateEnd = res.date;
    this.heurStart = CalenderComponent.getTime(res.date)
    this.heurEnd = CalenderComponent.getTime(res.date)
  }

  onEventClick(info) {
    this.formGroup.reset(undefined)
    this.modeEdit = true;
    this.id = info.event.id;
    this.headerText = 'Modifier journalisation'
    if (info.event.extendedProps.type === 'JournalisationT') {
      this.typeJournalisationT = 'Tache';
      this.journalisationService.getbyid(info.event.id).subscribe(response => {
        this.heurEnd = CalenderComponent.getTime(new Date(response.dateFin));
        this.heurStart = CalenderComponent.getTime(new Date(response.dateDebut));
        this.formGroup.patchValue(response);
        this.dateStart = new Date(response.dateDebut);
        this.dateEnd = new Date(response.dateFin);
        this.formGroup.get('tache').setValue(response?.tache?.idT)
        this.displayModal = true;
      })
    } else {
      this.typeJournalisationT = 'Normale';
      this.journalisationNDService.getbyid(info.event.id).subscribe(data => {
        this.heurEnd = CalenderComponent.getTime(new Date(data.dateFin));
        this.heurStart = CalenderComponent.getTime(new Date(data.dateDebut));
        this.formGroup.patchValue(data);
        this.dateStart = new Date(data.dateDebut);
        this.dateEnd = new Date(data.dateFin);
        this.formGroup.get('activiteND').setValue(data?.activiteND?.idA)
        this.displayModal = true;
      })
    }
  }

  private static getTime(date: Date): string {
    const currentHour = date.getHours();
    let currentMinute: any = date.getMinutes();
    if (currentMinute === 0) {
      currentMinute = '00'
    }
    console.log(currentHour,currentMinute)
    return currentHour.toString() + ':' + currentMinute.toString();
  }

  getAllEvent() {
    this.journalisationService.getAllEvent(this.userId).subscribe(data => {
      this.calendarOptions.events = [];
      for (let item of data) {
        let daystart = formatDate(item.dateDebut, 'yyyy-MM-dd HH:mm:ss', 'en_Us');
        let dayFin = formatDate(item.dateFin, 'yyyy-MM-dd HH:mm:ss', 'en_Us');
        let start = formatDate(item.dateDebut, 'HH:mm', 'en_Fr');
        let event = {
          id: item.id,
          title: item.description,
          start: daystart.toString(),
          end: dayFin.toString(),
          color: this.setColor(item.type),
          background: this.setColor(item.type),
          extendedProps: {
            user: 1,
            type: item.type,
            date: start.toString()
          }

        };
        this.Events.push(event);
        this.calendarOptions.events = this.Events;
      }
    })
  }

  modifier() {
    let formattedDtStart = formatDate(this.dateStart, 'yyyy-MM-dd', 'en_FR');
    let formattedDtEnd = formatDate(this.dateEnd, 'yyyy-MM-dd', 'en_FR');
    let hr = new Date(formattedDtStart + 'T' + this.heurStart + ':00');
    let hrEnd = new Date(formattedDtEnd + 'T' + this.heurEnd + ':00');
    if (this.typeJournalisationT == 'Tache') {
      let journalisationT = new JournalisationT();
      journalisationT.tache = this.taches.find(p => p.idT === Number(this.formGroup.get('tache').value));
      journalisationT.description = this.formGroup.get('description').value;
      journalisationT.dateDebut = hr;
      journalisationT.dateFin = hrEnd;
      journalisationT.personne = new UserEntity();
      journalisationT.personne.id =this.connectedUser.id;
      this.journalisationService.updateJournalisationT(journalisationT, this.id).subscribe(() => {
          this.toastr.success('ajout avec succes')
          this.ngAfterViewInit();
          this.formGroup.reset(undefined)
        },
        () => this.toastr.error('rendez-vous deja pris'))
    } else {
      let journalisationND = new JournalisationND();
      journalisationND.activiteND = this.activites.find(p => p.idA === Number(this.formGroup.get('activiteND').value));
      journalisationND.description = this.formGroup.get('description').value;
      journalisationND.dateDebut = hr;
      journalisationND.dateFin = hrEnd;
      journalisationND.personne = new UserEntity();
      journalisationND.personne.id =this.connectedUser.id;
      this.journalisationNDService.updateJournalisation(journalisationND, this.id).subscribe(() => {
          this.toastr.success('ajout avec succes')
          this.ngAfterViewInit();
          this.formGroup.reset(undefined)
        },
        () => this.toastr.error('rendez-vous deja pris'))
    }

  }

  supprimer(){
    const confirm = window.confirm('voulez-vous supprimer cet jouralisation');
    if (confirm) {
      if (this.typeJournalisationT == 'Tache') {
        this.journalisationService.delete(this.id).subscribe(res => {
            this.toastr.success('jouralisation supprimer ', 'Supprimer', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.ngAfterViewInit();
          },
          () => {
            this.toastr.success('jouralisation supprimer ', 'Supprimer', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.ngAfterViewInit();
          });
      } else {
        this.journalisationNDService.delete(this.id).subscribe(res => {
            this.toastr.success('jouralisation supprimer ', 'Supprimer', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.ngAfterViewInit();
          },
          () => {
            this.toastr.success('jouralisation supprimer ', 'Supprimer', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right'
            });
            this.ngAfterViewInit();
          });
      }
    }
  }

  getAllTaches() {
    this.tacheService.getAll().subscribe(data => {
      this.taches = data;
    });
  }

  getAllActivities() {
    this.projectService.getAll().subscribe(data => {
      this.activites = data.filter(item => item.type === 'nd');
    });
  }

  ajouter() {
    let formattedDtStart = formatDate(this.dateStart, 'yyyy-MM-dd', 'en_FR');
    let formattedDtEnd = formatDate(this.dateEnd, 'yyyy-MM-dd', 'en_FR');
    let hr = new Date(formattedDtStart + 'T' + this.heurStart + ':00');
    let hrEnd = new Date(formattedDtEnd + 'T' + this.heurEnd + ':00');
    if (this.typeJournalisationT == 'Tache') {
      let journalisationT = new JournalisationT();
      journalisationT.tache = this.taches.find(p => p.idT === Number(this.formGroup.get('tache').value));
      journalisationT.description = this.formGroup.get('description').value;
      journalisationT.dateDebut = hr;
      journalisationT.dateFin = hrEnd;
      journalisationT.personne = new UserEntity();
      journalisationT.personne.id =this.connectedUser.id;
      this.journalisationService.ajouterJournalisationT(journalisationT).subscribe(() => {
          this.toastr.success('ajout avec succes')
          this.ngAfterViewInit();
          this.formGroup.reset()
        },
        () => this.toastr.error('rendez-vous deja pris'))
    }else {
      let journalisationND = new JournalisationND();
      journalisationND.activiteND = this.activites.find(p => p.idA === Number(this.formGroup.get('activiteND').value));
      journalisationND.description = this.formGroup.get('description').value;
      journalisationND.dateDebut = hr;
      journalisationND.dateFin = hrEnd;
      journalisationND.personne = new UserEntity();
      journalisationND.personne.id =this.connectedUser.id;
      this.journalisationNDService.ajouterJournalisation(journalisationND).subscribe(() => {
          this.toastr.success('ajout avec succes')
          this.ngAfterViewInit();
          this.formGroup.reset()
        },
        () => this.toastr.error('rendez-vous deja pris'))
    }
    this.formGroup.reset(undefined);
  }


  dateStartBlur(event) {
    this.dateStart = new Date(event.srcElement.value);

  }

  dateEndBlur(event) {
    this.dateEnd = new Date(event.srcElement.value);
  }
}
