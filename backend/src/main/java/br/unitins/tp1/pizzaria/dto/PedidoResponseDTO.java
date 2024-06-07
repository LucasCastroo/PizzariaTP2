package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.Cupom;
import br.unitins.tp1.pizzaria.model.FormaPagamento;
import br.unitins.tp1.pizzaria.model.ProdutoPedido;
import br.unitins.tp1.pizzaria.model.Pedido;

import java.util.List;

public record PedidoResponseDTO(
        Long id,
        ClienteResponseDTO cliente,
        List<ProdutoPedidoResponseDTO> items,
        FormaPagamento formaPagamento,
        Cupom cupom,
        Double total,
        List<StatusPedidoResponseDTO> historicoStatus,
        EnderecoResponseDTO endereco
        ) {

    public static PedidoResponseDTO from(Pedido pedido){
        return new PedidoResponseDTO(
                pedido.getId(),
                ClienteResponseDTO.valueOf(pedido.getCliente()),
                pedido.getItems().stream().map(item -> new ProdutoPedidoResponseDTO(item.getQuant(), ProdutoResponseDTO.valueOf(item.getItem()))).toList(),
                pedido.getFormaPagamento(),
                pedido.getCupom(),
                pedido.getItems().stream().mapToDouble(i-> i.getItem().getPreco() * i.getQuant()).sum() - (pedido.getCupom() != null ? pedido.getCupom().getDesconto()  : 0),
                pedido.getStatus().stream().map(StatusPedidoResponseDTO::from).toList(),
                EnderecoResponseDTO.valueOf(pedido.getEndereco().getEndereco())
        );
    }
}
