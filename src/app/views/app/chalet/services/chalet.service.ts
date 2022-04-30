import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IChalet } from "src/app/model/chalet.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChaletService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(`${environment.serverUrl}/api/chalet/page-and-sort`);
  }
  getById(id: string): Observable<any>{
    return this.httpClient.get(`${environment.serverUrl}/api/chalet/${id}`)
  }

  patch(id: number, payload: IChalet): Observable<IChalet> {
    return this.httpClient.patch(`${environment.serverUrl}/api/chalet/${id}`, payload);
  }
}
