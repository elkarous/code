import {Activite} from "./Activite";
import {JournalisationT} from "./JournalisationT";

export class Tache {
  idT: number;
  nomT: string;
  dateDebut: Date;
  dateFin: Date;
  etat: string;
  disc: string;
  journalisation: JournalisationT[];
  projet: Activite;
}
