package br.unitins.tp1.pizzaria.dto;


import br.unitins.tp1.pizzaria.model.FormaPagamento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;

public record PedidoDTO(@NotNull List<ProdutoPedidoDTO> items, @NotBlank String codigoCupom, @NotNull Long idEndereco,
                        @NotNull FormaPagamento formaPagamento) {
}
