import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = "http://localhost:8080"
  private usuarioUrl = this.baseUrl + "/usuario";
  private minhaContaUrl = this.baseUrl + "/minha-conta"

  constructor(private httpClient: HttpClient) {  }

  findAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioUrl);
  }

  findById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usuarioUrl}/${id}`);
  }

  insert(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.usuarioUrl, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(`${this.usuarioUrl}/update/${usuario.id}`, usuario);
  }

  delete(usuario: Usuario): Observable<any> {
    return this.httpClient.delete<any>(`${this.usuarioUrl}/delete/${usuario.id}`);
  }

  minhaConta(){
    return this.httpClient.get<Usuario>(this.minhaContaUrl)
  }
}
