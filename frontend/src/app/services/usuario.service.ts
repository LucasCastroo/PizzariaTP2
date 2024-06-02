import {HttpBackend, HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Usuario, UsuarioCreate} from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private baseUrl = "http://localhost:8080"
  private usuarioUrl = this.baseUrl + "/usuario";
  private minhaContaUrl = this.baseUrl + "/minha-conta"
  private httpClientNoAuth: HttpClient;
  constructor(private httpClient: HttpClient, handler: HttpBackend) {
    this.httpClientNoAuth = new HttpClient(handler);
  }

  findAll(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(this.usuarioUrl);
  }

  findById(id: string): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.usuarioUrl}/${id}`);
  }

  insert(usuario: UsuarioCreate): Observable<Usuario> {
    return this.httpClientNoAuth.post<Usuario>(this.usuarioUrl, usuario);
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
