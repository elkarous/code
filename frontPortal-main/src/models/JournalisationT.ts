import {Tache} from "./Tache";
import {UserEntity} from "./userEntity";

export class JournalisationT {
  idJT: number;
  nbheure: number;
  tache: Tache;
  personne: UserEntity;
  dateDebut: Date;
  dateFin: Date;
  description: string;
}
