import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IChalet } from "../model/chalet.model";
import { IReservation } from "../model/reservation.model";

@Injectable({
    providedIn: 'root'
})
export class SharedObjectService {
    private _chalet: IChalet = {
        id: null,
        description: '',
        prix: '',
        adresse: '',
        etat: '',
        ville: '',
        codeZip: ''
    };

    private chaletSource = new BehaviorSubject(this._chalet);
    currentChalet = this.chaletSource.asObservable();

    private _reservation: IReservation = {}
    private reservationSource = new BehaviorSubject(this._reservation);
    currentReservation = this.reservationSource.asObservable();
    constructor() { }

    changeChalet(chalet: IChalet) {
        this.chaletSource.next(chalet)
    }

    changeReservation(reservation: IReservation) {
        this.reservationSource.next(reservation);
    }

}