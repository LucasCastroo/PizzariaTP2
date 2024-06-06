import {Pizza} from "./pizza";

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  kCal: number;
  nomeImagem: string;

}

export function isPizza(produto: any): produto is Pizza{
  return !!produto.tamanhoPizza;
}
