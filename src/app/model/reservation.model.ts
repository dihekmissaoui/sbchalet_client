import { IChalet } from "./chalet.model";
import { IFacture } from "./facture.model";
import { IUser } from "./user.model";

export interface IReservation {
  id?: number;
  dateDeDebut?: Date;
  dateDeDefin?: Date;
  chaletObj?: IChalet,
  chalet?: IChalet,
  nbNuites?: number,
  totalPrix?: number,
  user?: IUser;
  nbAdultes?: number;
  nbEnfant?: number;
  nbAnimal?: number;
  status?: string;
  colorStatus?: string;
  chaletId?: number;
  files?: any,
  factures?: IFacture[]
  resteTotalApayer?: number;
}
