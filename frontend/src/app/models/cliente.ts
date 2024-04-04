import { Endereco } from './endereco';
import {Usuario} from "./usuario";
export interface Cliente {
  id: number;
  enderecos?: Array<Endereco>;
  telefone: string;
  usuario: Usuario;
}
