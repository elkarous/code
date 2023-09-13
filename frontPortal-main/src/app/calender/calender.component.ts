import {Component, OnInit} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {RendezVousService} from "../services/rendez-vous.service";
import {formatDate} from "@angular/common";
import {AccountService} from "../services/account.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Patient} from "../../models/Patient";
import {PatientService} from "../services/patient.service";
import {Activite} from "../../models/Activite";
import {Tache} from "../../models/Tache";
import {ProjectService} from "../services/project.service";


@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  Events = [];
  displayModal = false;
  RendezvousS: Tache[] = [];
  calendarOptions: CalendarOptions;
  rdvId: number;
  medecinId: number
  modeEdit = false;
  patient: string;
  date: Date;
  debut: Date;
  tache = new Tache();
  ajoutTacheFormGroup: FormGroup;
  modifierRDVform: FormGroup;
  projets: Activite[] = [];
  heures = ['08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'];
  dateStart: Date;
  dateEnd: Date;
  heurStart = '';
  heurEnd = '';
  id: number;
  typeTache = 'Projet';
  taskTypes = ['Projet', 'Normale']
  headerText = '';

  constructor(private rdvService: RendezVousService,
              private userService: AccountService,
              private projectService: ProjectService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private patientService: PatientService) {
  }

  ngAfterViewInit() {
    this.Events = []
    this.getAllRdv();

    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next',
        center: 'title',
        right: 'today dayGridMonth,dayGridWeek',

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
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      eventColor: '#0c4d64',
      height: 600,
      eventBorderColor: '#5bc0de',
      editable: true
    };
  }

  ngOnInit(): void {
    this.ajoutTacheFormGroup = this.fb.group({
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
        right: 'today dayGridMonth,dayGridWeek',

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
      initialView: 'dayGridMonth',
      dateClick: this.onDateClick.bind(this),
      eventClick: this.onEventClick.bind(this),
      eventColor: '#bf0b0b',
      eventBorderColor: '#1abc9c',
      editable: true
    };
  }

  onDateClick(res) {
    this.modeEdit = false;
    this.headerText = 'Ajouter tache'
    this.displayModal = true;
    this.dateStart = res.date;
    this.dateEnd = res.date;
  }

  onEventClick(info) {
    this.modeEdit = true;
    this.headerText = 'Modifier tache'
    this.rdvService.getbyid(info.event.id).subscribe(data => {
      this.tache = data;
      this.heurEnd = this.getTime(new Date(data.dateFin));
      this.heurStart = this.getTime(new Date(data.dateDebut));
      this.ajoutTacheFormGroup.patchValue(data);
      this.dateStart =new  Date(data.dateDebut);
      this.dateEnd = new Date(data.dateFin);
      this.ajoutTacheFormGroup.get('projet').setValue(data?.projet?.idA)
      this.displayModal = true;
    })
  }
  eventColor(event): string {
    return event === 'new'?'#0c4d64':'red'
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
    this.rdvService.getrdvByState().subscribe(data => {
      this.RendezvousS = data;
      this.calendarOptions.events = [];
      for (let rdv of this.RendezvousS) {
        let daystart = formatDate(rdv.dateDebut, 'yyyy-MM-dd HH:mm:ss', 'en_Us');
        let dayFin = formatDate(rdv.dateFin, 'yyyy-MM-dd HH:mm:ss', 'en_Us');
        let start = formatDate(rdv.dateDebut, 'HH:mm', 'en_Fr');
        let event = {
          id: rdv.idT,
          title: rdv.nomT,
          start: daystart.toString(),
          end: dayFin.toString(),
          color: this.eventColor(rdv.nomT),
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
    this.ajoutTacheFormGroup.get('dateDebut').value;
    let formattedDtStart = formatDate(this.dateStart, 'yyyy-MM-dd', 'en_FR');
    let formattedDtEnd = formatDate(this.dateEnd, 'yyyy-MM-dd', 'en_FR');
    let hr = new Date(formattedDtStart + 'T' + this.heurStart + ':00');
    let hrEnd = new Date(formattedDtEnd + 'T' + this.heurEnd + ':00');
    let tache = new Tache();
    const project = this.projets.find(p => p.idA === Number(this.ajoutTacheFormGroup.get('projet').value))
    tache.projet = project;
    tache.nomT = this.ajoutTacheFormGroup.get('nomT').value;
    tache.disc = this.ajoutTacheFormGroup.get('disc').value;
    tache.etat = this.ajoutTacheFormGroup.get('etat').value;
    tache.dateDebut = hr;
    tache.dateFin = hrEnd;
    this.rdvService.updateTache(tache,this.tache.idT).subscribe(() => {
        this.toastr.success('ajout avec succes')
        this.ngAfterViewInit();
        this.ajoutTacheFormGroup.reset()
      },
      () => this.toastr.error('rendez-vous deja pris'))

      this.ajoutTacheFormGroup.reset()

  }


  getAllProject() {
    this.projectService.getAll().subscribe(data => {
      this.projets = data;
    });
  }

  ajoutTache() {
    let formattedDtStart = formatDate(this.dateStart, 'yyyy-MM-dd', 'en_FR');
    let formattedDtEnd = formatDate(this.dateEnd, 'yyyy-MM-dd', 'en_FR');
    let hr = new Date(formattedDtStart + 'T' + this.heurStart + ':00');
    let hrEnd = new Date(formattedDtEnd + 'T' + this.heurEnd + ':00');
    let tache = new Tache();
    const project = this.projets.find(p => p.idA === Number(this.ajoutTacheFormGroup.get('projet').value))
    tache.projet = project;
    tache.nomT = this.ajoutTacheFormGroup.get('nomT').value;
    tache.disc = this.ajoutTacheFormGroup.get('disc').value;
    tache.etat = this.ajoutTacheFormGroup.get('etat').value;
    tache.dateDebut = hr;
    tache.dateFin = hrEnd;
    this.rdvService.ajouterTache(tache).subscribe(() => {
        this.toastr.success('ajout avec succes')
        this.ngAfterViewInit();
        this.ajoutTacheFormGroup.reset()
      },
      () => this.toastr.error('rendez-vous deja pris'))
    this.ajoutTacheFormGroup.reset();
  }


  dateStartBlur(event) {
    this.dateStart = new Date(event.srcElement.value);

  }

  dateEndBlur(event) {
    this.dateEnd = new Date(event.srcElement.value);
  }
}
