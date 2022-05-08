import { Image } from "./image.model";
import { IReservation } from "./reservation.model";

export interface IChalet {
  id?: number;
  description?: string;
  adresse?: string;
  etat?: string;
  ville?: string;
  codeZip?: number;
  prix?: number;
  maxAdulte?: number;
  maxEnfant?: number;
  maxBebe?: number;
  maxAnimal?: number;
  reservations?: IReservation[];
  images?: Image[];
}
