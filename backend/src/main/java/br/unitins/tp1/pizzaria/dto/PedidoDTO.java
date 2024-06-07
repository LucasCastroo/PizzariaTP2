package br.unitins.tp1.pizzaria.dto;


import br.unitins.tp1.pizzaria.model.FormaPagamento;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.Length;

import java.util.List;

public record PedidoDTO(@NotNull @Size(min = 1) List<ProdutoPedidoDTO> items, @NotBlank String codigoCupom, @NotNull Long idEndereco,
                        @NotNull FormaPagamento formaPagamento) {
}
