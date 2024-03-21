/* tslint:disable */
/* eslint-disable */
import { LocalDate } from './local-date';
import { NivelAcesso } from './nivel-acesso';
export interface Funcionario {
  id: number;
  cpf: string;
  email: string;
  nascimento: LocalDate;
  nome: string;
  senha: string;
  tipoAcesso: NivelAcesso;
}
