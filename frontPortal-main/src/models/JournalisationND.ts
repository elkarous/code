
import {UserEntity} from "./userEntity";
import {Activite} from "./Activite";

export class JournalisationND {
  idJT: number;
  nbheure: number;
  activiteND: Activite;
  personne: UserEntity;
  dateDebut: Date;
  dateFin: Date;
  description: string;
}
