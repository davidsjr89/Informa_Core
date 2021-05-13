import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Modalidade } from './../shared/models/modalidade';
import { environment } from './../../environments/environment';
import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";

@Injectable({
    providedIn: 'root'
})

export class ModalidadeService extends BaseService {
    url: string = `${environment.baseUrl}modalidade/`;
    
    private modalidadeData!: Modalidade;

    constructor( private http: HttpClient, private fb: FormBuilder){
        super();
    }

    setModalidadeData(modalidade: Modalidade){
        this.modalidadeData = modalidade;
    }
    getModalidadeData(){
        return this.modalidadeData;
    }

    carregarTodos(): Observable<Modalidade[]>{
        return this.http.get<Modalidade[]>(`${this.url}carregar-todos`, this.ObterAuthHeaderJson());
    }

    carregarPorId(id: number): Observable<Modalidade>{
        return this.http.get<Modalidade>(`${this.url}carregar-por-id?id=${id}`, this.ObterAuthHeaderJson())
      }
      
      adicionar(modalidade: Modalidade): Observable<Modalidade> {
        return this.http.post<Modalidade>(`${this.url}adicionar`, modalidade, this.ObterAuthHeaderJson());
      }
    
      atualizar(modalidade: Modalidade): Observable<Modalidade>{
        return this.http.post<Modalidade>(`${this.url}atualizar`, modalidade, this.ObterAuthHeaderJson())
      }
    
      ativardesativar(modalidade: Modalidade): Observable<Modalidade>{
        modalidade.ativo = !modalidade.ativo;
        return this.http.post<Modalidade>(`${this.url}atualizar`, modalidade, this.ObterAuthHeaderJson())
      }
    
      public criarFormulario(editar: boolean): FormGroup {
        if(this.modalidadeData){
          return this.fb.group({
            id: this.modalidadeData.id,
            nome: [{value: this.modalidadeData.nome, disabled: !editar}, [Validators.required, Validators.minLength(2), Validators.maxLength(50),],] ,
            ativo: [{value: this.modalidadeData.ativo, disabled: !editar}]
          })
        }
        return this.fb.group({
          id: [0, Validators.max(0)],
          nome: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50),],],
          ativo: [false]
        });
      }
}