import {Produto} from "./produto";

export interface Pedido{
  id?: number;
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
  PIX = "PIX",
  DINHEIRO = "DINHEIRO",
  CARTAO = "CARTAO"
}
