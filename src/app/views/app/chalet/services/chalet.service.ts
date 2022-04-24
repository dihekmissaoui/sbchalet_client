import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class ChaletService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<any> {
    return this.httpClient.get(`${environment.serverUrl}/api/chalet/page-and-sort`);
  }
  getById(id_chalet: string): Observable<any>{
    return this.httpClient.get(`${environment.serverUrl}/api/chalet/${id_chalet}`)
  }
}
