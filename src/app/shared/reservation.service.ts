import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IReservation } from '../model/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });
  options = { headers: this.headers };

  constructor(private httpClient: HttpClient) { }

  save(reservation: IReservation): Observable<any> {
    return this.httpClient.post(`${environment.serverUrl}/api/reservation`, reservation, this.options);
  }

  patch(id: number, payload: IReservation): Observable<IReservation> {
    return this.httpClient.patch(`${environment.serverUrl}/api/reservation/${id}?changeStatus=${true}`, payload, this.options);
  }


  find(): Observable<IReservation[]> {
    return this.httpClient.get<IReservation[]>(`${environment.serverUrl}/api/reservation`);
  }

  getById(id: number): Observable<IReservation> {
    return this.httpClient.get<IReservation>(`${environment.serverUrl}/api/reservation/${id}`);
  }

}
