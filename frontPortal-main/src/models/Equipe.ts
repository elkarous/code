import {UserEntity} from "./userEntity";
import {Activite} from "./Activite";

export class Equipe {
  idE: number;
  nomE: number;
  chef :UserEntity
  menbres: UserEntity[];
  activites: Activite[];
}
