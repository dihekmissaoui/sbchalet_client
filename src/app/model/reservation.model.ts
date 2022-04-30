import { IChalet } from "./chalet.model";
import { IUser } from "./user.model";

export interface IReservation {
  idResarvation?: number;
  dateDeDebut?: Date;
  dateDeDefin?: Date;
  chalet?: number,
  nbNuites?: number,
  totalPrix?: number,
  user?: IUser;
}
