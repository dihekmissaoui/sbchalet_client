import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private httpClient: HttpClient) { }

  save(reservation: IReservation): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept':'*/*'

    });
    let options = { headers: headers };

    return this.httpClient.post(`${environment.serverUrl}/api/reservation`, reservation, options);
  }

}
