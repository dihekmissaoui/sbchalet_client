import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IChalet } from "../model/chalet.model";
import { IReservation } from "../model/reservation.model";
import { IUser } from "../model/user.model";

@Injectable({
    providedIn: 'root'
})
export class SharedObjectService {
    private _chalet: IChalet = {};
    private chaletForUpdate: IChalet = {};
    private isChaletInEditMode: boolean = false;
    private chaletForUpdateSource = new BehaviorSubject(this.chaletForUpdate);
    private isChaletInEditModeSource = new BehaviorSubject(this.isChaletInEditMode);
    currentChaletForUpdate = this.chaletForUpdateSource.asObservable();
    currenIsChaletInEditMode  =this.isChaletInEditModeSource.asObservable();


    private chaletSource = new BehaviorSubject(this._chalet);
    currentChalet = this.chaletSource.asObservable();

    private _reservation: IReservation = {}
    private reservationSource = new BehaviorSubject(this._reservation);
    currentReservation = this.reservationSource.asObservable();

    private _user: IUser = {}
    private userSource = new BehaviorSubject(this._user);
    currentUser = this.userSource.asObservable();

    constructor() { }

    changeChalet(chalet: IChalet) {
        this.chaletSource.next(chalet)
    }

    changeReservation(reservation: IReservation) {
        this.reservationSource.next(reservation);
    }

    changeUser(user: IUser) {
        this.userSource.next(user);
    }
    
    changeCurrentChaletForUpdate(chalet: IChalet){
        this.chaletForUpdateSource.next(chalet);
    }
    
    changeCurrenIsChaletInEditMode (value: boolean){
        this.isChaletInEditModeSource.next(value);
    }
}