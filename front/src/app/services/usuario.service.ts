import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { Usuario } from './../shared/models/usuario';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  url: string = `${environment.baseUrl}usuario/`;
  constructor(
    private http: HttpClient
  ) {}

  login(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.url}login`, usuario);
  }
}
