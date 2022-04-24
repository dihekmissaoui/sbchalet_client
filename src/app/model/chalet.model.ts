import { Image } from "./image.model";
import { IReservation } from "./reservation.model";

export interface IChalet {
  id?: number;
  description?: string;
  prix?: string;
  adresse?: string;
  etat?: string;
  ville?: string;
  codeZip?: string;
  reservations?: IReservation[];
  images?: Image[];
}
