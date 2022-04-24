import { IChalet } from "./chalet.model";

export interface IReservation {
  idResarvation?: number;
  dateDeDebut?: Date;
  dateDeDefin?: Date;
  chalet?: IChalet
}
