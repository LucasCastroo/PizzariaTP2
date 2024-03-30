import { NivelAcesso } from './nivel-acesso';
export interface Funcionario {
  id: number;
  cpf: string;
  email: string;
  nascimento: string;
  nome: string;
  senha: string;
  tipoAcesso: NivelAcesso;
}
