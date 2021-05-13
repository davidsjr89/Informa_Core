import { Cargo } from './../shared/models/cargo';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService extends BaseService {
  url: string = `${environment.baseUrl}cargo/`;
  
  private cargoData!: Cargo;

  constructor( private http: HttpClient, private fb: FormBuilder){
      super();
  }

  setCargoData(cargo: Cargo){
      this.cargoData = cargo;
  }
  getCargoData(){
      return this.cargoData;
  }

  carregarTodos(): Observable<Cargo[]>{
      return this.http.get<Cargo[]>(`${this.url}carregar-todos`, this.ObterAuthHeaderJson());
  }

  carregarPorId(id: number): Observable<Cargo>{
      return this.http.get<Cargo>(`${this.url}carregar-por-id?id=${id}`, this.ObterAuthHeaderJson())
    }
    
    adicionar(cargo: Cargo): Observable<Cargo> {
      return this.http.post<Cargo>(`${this.url}adicionar`, cargo, this.ObterAuthHeaderJson());
    }
  
    atualizar(cargo: Cargo): Observable<Cargo>{
      return this.http.post<Cargo>(`${this.url}atualizar`, cargo, this.ObterAuthHeaderJson())
    }
  
    ativardesativar(cargo: Cargo): Observable<Cargo>{
      cargo.ativo = !cargo.ativo;
      return this.http.post<Cargo>(`${this.url}atualizar`, cargo, this.ObterAuthHeaderJson())
    }
  
    public criarFormulario(editar: boolean): FormGroup {
      if(this.cargoData){
        return this.fb.group({
          id: this.cargoData.id,
          nome: [{value: this.cargoData.nome, disabled: !editar}, [Validators.required, Validators.minLength(2), Validators.maxLength(50),],] ,
          descricao: [{value: this.cargoData.descricao, disabled: !editar}, [Validators.required, Validators.minLength(2), Validators.maxLength(50),],] ,
          ativo: [{value: this.cargoData.ativo, disabled: !editar}]
        })
      }
      return this.fb.group({
        id: [0, Validators.max(0)],
        nome: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(60),],],
        descricao: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(60),],],
        ativo: [false]
      });
    }
}