import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Funcionario } from '../models/funcionario';

@Injectable({
  providedIn: 'root'
})
export class funcionarioService {
  private baseUrl = 'http://localhost:8080/funcionarios';

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Funcionario[]> {
    return this.httpClient.get<Funcionario[]>(this.baseUrl);
  }

  findById(id: string): Observable<Funcionario> {
    return this.httpClient.get<Funcionario>(`${this.baseUrl}/${id}`);
  }

  insert(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.post<Funcionario>(this.baseUrl, funcionario);
  }

  update(funcionario: Funcionario): Observable<Funcionario> {
    return this.httpClient.put<Funcionario>(`${this.baseUrl}/${funcionario.id}`, funcionario);
  }

  delete(funcionario: Funcionario): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/${funcionario.id}`);
  }
}
