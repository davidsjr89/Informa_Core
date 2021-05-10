import { Observable } from 'rxjs';
import { Unidade } from './../shared/models/unidade';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { environment } from 'src/environments/environment.prod';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class UnidadeService extends BaseService{
  url: string = `${environment.baseUrl}unidade/`;

  private unidadeData!: Unidade;

  constructor(
    private http: HttpClient, 
    private fb: FormBuilder
  ) { super(); }
  
  setUnidadeData(unidade: Unidade){
    this.unidadeData = unidade;
  }
  getUnidadeData(){
    return this.unidadeData;
  }
  carregartodos(): Observable<Unidade[]>{
    return this.http.get<Unidade[]>(`${this.url}carregar-todos`, this.ObterAuthHeaderJson())
  }

  carregarPorId(id: number): Observable<Unidade>{
    return this.http.get<Unidade>(`${this.url}carregar-por-id?id=${id}`, this.ObterAuthHeaderJson())
  }
  
  adicionar(unidade: Unidade): Observable<Unidade> {
    return this.http.post<Unidade>(`${this.url}adicionar`, unidade, this.ObterAuthHeaderJson());
  }

  atualizar(unidade: Unidade): Observable<Unidade>{
    return this.http.post<Unidade>(`${this.url}atualizar`, unidade, this.ObterAuthHeaderJson())
  }

  ativardesativar(unidade: Unidade): Observable<Unidade>{
    unidade.ativo = !unidade.ativo;
    return this.http.post<Unidade>(`${this.url}atualizar`, unidade, this.ObterAuthHeaderJson())
  }

  public criarFormulario(editar: boolean): FormGroup {
    if(this.unidadeData){
      return this.fb.group({
        id: this.unidadeData.id,
        nome: [{value: this.unidadeData.nome, disabled: !editar}, [Validators.required, Validators.minLength(2), Validators.maxLength(50),],] ,
        telefone: [{value: this.unidadeData.telefone, disabled: !editar}, [Validators.required, Validators.minLength(10), Validators.maxLength(11),]] ,
        cep: [{value: this.unidadeData.cep, disabled: !editar}, [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
        endereco: [{value: this.unidadeData.endereco, disabled: !editar}, [Validators.required, Validators.minLength(3), Validators.maxLength(80),]] ,
        numero: [{value: this.unidadeData.numero, disabled: !editar},[Validators.required,Validators.minLength(1),Validators.maxLength(10),],] ,
        bairro: [{value: this.unidadeData.bairro, disabled: !editar},[Validators.required,Validators.minLength(2),Validators.maxLength(50),],],
        cidade: [{value: this.unidadeData.cidade, disabled: !editar},[Validators.required,Validators.minLength(2),Validators.maxLength(30),],],
        estado: [{value: this.unidadeData.estado, disabled: !editar},[Validators.required,Validators.minLength(2),Validators.maxLength(15),],],
        jurosMensal: [{value: this.unidadeData.jurosMensal, disabled: !editar}, [Validators.required, Validators.min(0)]],
        ativo: [{value: this.unidadeData.ativo, disabled: !editar}]
      })
    }
    return this.fb.group({
      id: [0, Validators.max(0)],
      nome: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50),],],
      telefone: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(11),],],
      cep: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(8)],],
      endereco: ['',[Validators.required,Validators.minLength(3),Validators.maxLength(80),],],
      numero: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(10),],],
      bairro: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(50),],],
      cidade: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(30),],],
      estado: ['',[Validators.required,Validators.minLength(2),Validators.maxLength(15),],],
      jurosMensal: ['', [Validators.required, Validators.min(0)]],
      ativo: [false]
    });
  }  
}
