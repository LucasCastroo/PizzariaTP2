import {Produto} from "./produto";

export interface Pedido{
  items: ProdutoPedido[];
  cupom: string,
  idEndereco: number,
  formaPagamento: FormaPagamento;
}

export interface ProdutoPedido {
  quantidade: number
  produto: Produto
}

export enum FormaPagamento{
  PIX,
  DINHEIRO,
  CARTAO
}
