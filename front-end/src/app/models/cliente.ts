/* tslint:disable */
/* eslint-disable */
import { Endereco } from './endereco';
export interface Cliente {
  id: number;
  cpf: string;
  email: string;
  enderecos?: Array<Endereco>;
  nascimento: string;
  nome: string;
  senha: string;
  telefone: string;
}
