import { Colaborador } from './../shared/models/colaborador';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService  extends BaseService {
  // url: string = `${environment.baseUrl}colaborador/`;
  url: string = `http://localhost:6068/colaborador/`;
  
  private colaboradorData!: Colaborador;

  constructor( private http: HttpClient, private fb: FormBuilder){
      super();
  }

  setColaboradorData(colaborador: Colaborador){
      this.colaboradorData = colaborador;
  }
  getColaboradorData(){
      return this.colaboradorData;
  }

  carregarTodos(): Observable<Colaborador[]>{
      return this.http.get<Colaborador[]>(`${this.url}carregar-todos`, this.ObterAuthHeaderJson());
  }

  carregarPorId(id: number): Observable<Colaborador>{
      return this.http.get<Colaborador>(`${this.url}carregar-por-id?id=${id}`, this.ObterAuthHeaderJson())
    }
    
    adicionar(colaborador: Colaborador): Observable<Colaborador> {
      return this.http.post<Colaborador>(`${this.url}adicionar`, colaborador, this.ObterAuthHeaderJson());
    }
  
    atualizar(colaborador: Colaborador): Observable<Colaborador>{
      return this.http.post<Colaborador>(`${this.url}atualizar`, colaborador, this.ObterAuthHeaderJson())
    }
  
    ativardesativar(colaborador: Colaborador): Observable<Colaborador>{
      colaborador.ativo = !colaborador.ativo;
      return this.http.post<Colaborador>(`${this.url}atualizar`, colaborador, this.ObterAuthHeaderJson())
    }
  
    public criarFormulario(editar: boolean): FormGroup {
      if(this.colaboradorData){
        return this.fb.group({
          id: [{value: this.colaboradorData.id, disabled: !editar}, Validators.max(0)],
          nome: [{value: this.colaboradorData.nome, disabled: !editar},[Validators.required, Validators.minLength(2), Validators.maxLength(60),],],
          dataNascimento: [{value: this.colaboradorData.dataNascimento.toString().substring(0,10), disabled: !editar},[Validators.required, Validators.minLength(8), Validators.maxLength(10),],],
          cpf: [{value: this.colaboradorData.cpf, disabled: !editar},[Validators.required, Validators.minLength(8), Validators.maxLength(15),],],
          rg: [{value: this.colaboradorData.rg, disabled: !editar},[Validators.required, Validators.minLength(8), Validators.maxLength(15),],],
          endereco: [{value: this.colaboradorData.endereco, disabled: !editar},[Validators.required, Validators.minLength(1), Validators.maxLength(60),],],
          telefone: [{value: this.colaboradorData.telefone, disabled: !editar},[Validators.required, Validators.minLength(10), Validators.maxLength(11),],],
          cargoId: [{value: this.colaboradorData.cargo?.id, disabled: !editar},[Validators.required, Validators.minLength(1), Validators.maxLength(10),],],
          numero: [{value: this.colaboradorData.numero, disabled: !editar},[Validators.required, Validators.minLength(1), Validators.maxLength(10),],],
          bairro: [{value: this.colaboradorData.bairro, disabled: !editar},[Validators.required, Validators.minLength(2), Validators.maxLength(30),],],
          cidade: [{value: this.colaboradorData.cidade, disabled: !editar},[Validators.required, Validators.minLength(2), Validators.maxLength(30),],],
          estado: [{value: this.colaboradorData.estado, disabled: !editar},[Validators.required, Validators.minLength(2), Validators.maxLength(25),],],
          cep: [{value: this.colaboradorData.cep, disabled: !editar},[Validators.required, Validators.minLength(8), Validators.maxLength(9),],],
          email: [{value: this.colaboradorData.email, disabled: !editar},[Validators.required, Validators.minLength(2), Validators.maxLength(50),],],
          dataCadastro: [{value: this.colaboradorData.dataCadastro, disabled: !editar},[Validators.required, Validators.minLength(2), Validators.maxLength(10),],],
          cargo: [],
          ativo: [false]
        })
      }
      return this.fb.group({
        id: [0, Validators.max(0)],
        nome: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(60),],],
        dataNascimento: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(10),],],
        cpf: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(15),],],
        rg: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(15),],],
        email: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(50),],],
        telefone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(11),],],
        cep: ['',[Validators.required, Validators.minLength(8), Validators.maxLength(9),],],
        endereco: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(60),],],
        numero: ['',[Validators.required, Validators.minLength(1), Validators.maxLength(10),],],
        cargoId: [['', Validators.required]],
        bairro: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(30),],],
        cidade: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(30),],],
        estado: ['',[Validators.required, Validators.minLength(2), Validators.maxLength(25),],],
        dataCadastro: [Date],
        cargo: [],
        ativo: [false]
      });
    }
}