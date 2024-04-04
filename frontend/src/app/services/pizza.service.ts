import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pizza} from "../models/pizza";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  private baseUrl = "http://localhost:8080/produto";
  constructor(private httpClient: HttpClient) {

  }

  findAll(page?: number, pageSize?: number): Observable<Pizza[]> {
    let params = {
      tipo: "PIZZA",
      page: "0",
      pageSize: "20"
    };
    if (page !== undefined && pageSize !== undefined) {
      params.page = page.toString();
      params.pageSize = pageSize.toString();
    }
    return this.httpClient.get<Pizza[]>(this.baseUrl, {params});
  }

}
