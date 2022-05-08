import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IChalet } from "src/app/model/chalet.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChaletService {

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': '*/*'
  });
  options = { headers: this.headers };

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this.httpClient.get(`${environment.serverUrl}/api/chalet/page-and-sort`);
  }
  getById(id: string): Observable<any> {
    return this.httpClient.get(`${environment.serverUrl}/api/chalet/${id}`)
  }

  save(chalet: IChalet): Observable<IChalet> {
    return this.httpClient.post<IChalet>(`${environment.serverUrl}/api/chalet`, chalet, this.options);
  }

  patch(id: number, payload: IChalet): Observable<IChalet> {
    return this.httpClient.patch(`${environment.serverUrl}/api/chalet/${id}`, payload);
  }

  delete(id): Observable<Response> {
    return this.httpClient.delete<Response>(`${environment.serverUrl}/api/chalet/${id}`);
  }
}
