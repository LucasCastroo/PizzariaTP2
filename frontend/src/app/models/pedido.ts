import {Produto} from "./produto";
import {Endereco} from "./endereco";
import {Cupom} from "./cupom";

export interface Pedido{
  id?: number;
  items: ProdutoPedido[] | ProdutoPedidoCreate[];
  cupom?: Cupom;
  codigoCupom?: string;
  idEndereco?: number;
  endereco?: Endereco;
  formaPagamento: FormaPagamento;
  historicoStatus: StatusPedido[]
  total: number;
}

export interface StatusPedido {
  id?: number;
  status?: Status;
  data?: string;
}

export enum Status {
  AGUARDANDO_PAGAMENTO = "AGUARDANDO_PAGAMENTO",
  EM_PREPARO = "EM_PREPARO",
  EM_ENTREGA = "EM_ENTREGA",
  ENTREGUE = "ENTREGUE",
  CANCELADO = "CANCELADO",
}
export function formatStatus(status: Status): string {
  switch (status) {
    case Status.AGUARDANDO_PAGAMENTO: return "Aguardando pagamento";
    case Status.CANCELADO: return "Cancelado";
    case Status.EM_ENTREGA: return "Saiu para entrega";
    case Status.EM_PREPARO: return "Preparando";
    case Status.ENTREGUE: return "Entregue";
  }
}


export interface ProdutoPedido {
  quantidade: number
  produto: Produto
}

export interface ProdutoPedidoCreate {
  quantidade: number;
  idProduto: number;
}

export enum FormaPagamento{
  PIX = "PIX",
  DINHEIRO = "DINHEIRO",
  CARTAO = "CARTAO"
}

export function formatFormaPagamento(formaPagamento: FormaPagamento): string {
  switch (formaPagamento) {
    case FormaPagamento.PIX: return "Pix";
    case FormaPagamento.CARTAO: return "Cartão";
    case FormaPagamento.DINHEIRO: return "Dinheiro"
  }
}
