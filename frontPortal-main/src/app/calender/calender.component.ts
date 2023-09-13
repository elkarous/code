import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CalendarOptions} from "@fullcalendar/angular";
import {RendezVousService} from "../services/rendez-vous.service";
import {RendezVousEntity} from "../../models/RendezVous";
import {DatePipe, formatDate} from "@angular/common";
import {AccountService} from "../services/account.service";
import {UserEntity} from "../../models/userEntity";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Patient} from "../../models/Patient";
import {PatientService} from "../services/patient.service";
import {Activite} from "../../models/Activite";




@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {

  Events = [];
  displayModal=false;
  RendezvousS: Activite[] = [];
  calendarOptions: CalendarOptions;
  rdvId: number;
  medecinId: number
  medecin = new UserEntity();
  displayBasic2 = false;
  displayBasic = false;
  patient: string;
  date: Date;
  debut: Date;
  rendezvous = new RendezVousEntity();
  ajoutRDVform: FormGroup;
  modifierRDVform: FormGroup;
  medecins: UserEntity[]=[];
  heures=['08:30','09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];
  dateajout:Date;
  heur='';
  id:number;
  typepatient:string;
  typeP=['Ancien','Nouveau']
  patients:Patient[]=[];
  patientid:number;
  pat=new Patient()
  constructor(private rdvService: RendezVousService,
              private userService: AccountService,
              private fb: FormBuilder,
              private toastr: ToastrService,
              private patientService: PatientService) {
  }

  ngAfterViewInit() {
this.Events=[]
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
      height:600,
      eventBorderColor:'#5bc0de',
      editable:true
    };
  }

  ngOnInit(): void {
    this.ajoutRDVform =this.fb.group({
      //patientEmail:['', Validators.required],
      user: ['', Validators.required],
      dateajout: ['', Validators.required],
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
      patient: ['', Validators.required],
      heure: ['', Validators.required]
    })
    this.modifierRDVform =this.fb.group({
      patientEmail:['', Validators.required],
      user: ['', Validators.required],
      date: ['', Validators.required],
      heure: ['', Validators.required]
    })
    this.getAllRdv();
    this.getAllMedecin();
    this.getallpatient()
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
      eventColor: '#1abc9c',
      eventBorderColor: '#1abc9c',
      editable: true
    };
  }

  onDateClick(res) {
    this.displayModal = true;
    this.dateajout=res.date;
  }

  onEventClick(info) {
    this.displayBasic2=true;
    this.rdvId = info.event.id;
    this.medecinId = info.event.extendedProps.user;
    this.patient = info.event.title;
    this.date = info.event.start;
    this.debut = info.event.extendedProps.date;
    console.log(this.debut.toString())
    this.rdvService.getbyid(info.event.id).subscribe(data => {
      this.rendezvous=data;
      console.log(data)


    })
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
          id: rdv.idA,
          title: rdv.type,
          start: daystart.toString(),
          end:dayFin.toString(),
          background: '#1abc9c',
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
    console.log(this.medecinId)
    for(let m of this.medecins){
      if(m.id==this.medecinId){
        this.rendezvous.user=m;
      }
    }
    let format = formatDate(this.date, 'yyyy-MM-dd', 'en_FR')
    console.log(format)
    let hr = new Date(format+ 'T' + this.debut+ ':00');
    this.rendezvous.patientEmail=this.modifierRDVform.get('patientEmail').value;
    this.rendezvous.dateOfApt=hr;
    console.log(this.rendezvous )
    this.rdvService.updateApt(this.rendezvous).subscribe(data=> {
      console.log(data)
      this.toastr.success('modification avec succes')
      this.ngAfterViewInit();
      this.modifierRDVform.reset()
    })

  }
  getuserbyid(){
  this.userService.getById(this.modifierRDVform.get('user').value).subscribe(data=>this.rendezvous.user=data);
}

  getAllMedecin(){
    this.userService.getuserByRole("Medecin").subscribe(data=>{this.medecins=data;
      console.log(this.medecins)});
  }

  ajoutRdv(){
    this.patientService.getbyid(this.patientid).subscribe(data=> {
      this.pat = data
      console.log(this.pat)
      let formattedDt = formatDate(this.dateajout, 'yyyy-MM-dd', 'en_FR')
      console.log(formattedDt)
      let hr = new Date(formattedDt + 'T' + this.heur + ':00');
      let rdv: any = {patientEmail: this.pat.email, user: {id: this.id}, dateOfApt: hr, patient: this.pat}
      console.log(this.date + this.heur, rdv)
      this.rdvService.ajouterApt(rdv).subscribe(data => {
          console.log(data)
          this.toastr.success('ajout avec succes')
          this.ngAfterViewInit();
          this.ajoutRDVform.reset()
        },
        erreur => this.toastr.error('rendez-vous deja pris'))
    })
  }
  ajoutnouveaurdv(){
    let pat:any={nom:this.ajoutRDVform.get('nom').value,prenom:this.ajoutRDVform.get('prenom').value,
      email:this.ajoutRDVform.get('email').value, numtelephone:this.ajoutRDVform.get('telephone').value}
this.patientService.ajoutPatient(pat).subscribe(data=> {
  let format = formatDate(this.dateajout, 'yyyy-MM-dd', 'en_FR')
  console.log(format)
  let hr = new Date(format + 'T' + this.heur + ':00');
  let rdv: any = {patientEmail: this.ajoutRDVform.get('email').value, user: {id: this.id}, dateOfApt: hr , patient:data}
  console.log(this.date + this.heur, rdv)
  this.rdvService.ajouterApt(rdv).subscribe(data => {
      console.log(data)
      this.toastr.success('ajout avec succes')
      this.ngAfterViewInit();
      this.ajoutRDVform.reset()
    },
    erreur => this.toastr.error('rendez-vous deja pris'))
})
  }
  annulerRDV(){
    this.rdvService.refuserRdv(this.rendezvous).subscribe(res=>{

      this.toastr.success('rendezvous annulé')
      this.ngAfterViewInit()
    })
  }
  getallpatient(){
    this.patientService.getAllpatient().subscribe(data=>this.patients=data)

  }


}
