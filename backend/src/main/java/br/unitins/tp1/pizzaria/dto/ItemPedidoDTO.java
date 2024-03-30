package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.TipoItem;

public record ItemPedidoDTO(
        Integer quantidade,
        Long idItem
) {
}
