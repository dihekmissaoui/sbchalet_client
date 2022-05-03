import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IFacture } from '../model/facture.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });
  options = { headers: this.headers };

  constructor(private httpClient: HttpClient) { }

  save(facture: IFacture): Observable<IFacture> {
    return this.httpClient.post<IFacture>(`${environment.serverUrl}/api/facture`, facture, this.options);
  }

}
