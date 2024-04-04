import { NivelAcesso } from './nivel-acesso';
import {Usuario} from "./usuario";
export interface Funcionario {
  id: number;
  tipoAcesso: NivelAcesso;
  usuario: Usuario;
}
