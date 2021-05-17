import { Cargo } from './cargo';
export interface Colaborador {
  id: number;
  nome: string;
  dataNascimento: Date;
  cpf: string;
  rg: string;
  endereco: string;
  telefone: string;
  cargoId?: number;
  numero: string;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  email: string;
  dataCadastro: Date;
  ativo: boolean;
  cargo?: Cargo;
}
