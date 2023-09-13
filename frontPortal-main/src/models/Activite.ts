import {Equipe} from "./Equipe";
import {Site} from "./Site";

export class Activite {
  idA: number;
  nomA: string;
  type: string;
  dateDebut: Date;
  dateFin: Date;
  etat: string;
  disc: string;
  equipe: Equipe;
  site: Site;
}
