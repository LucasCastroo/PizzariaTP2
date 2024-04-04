package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.TamanhoPizza;
import br.unitins.tp1.pizzaria.model.TipoProduto;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

import java.util.HashSet;
import java.util.Set;

public record ProdutoDTO(@NotBlank String nome, @NotBlank String descricao, @Positive Double preco,
                         @Positive Integer kCal, @NotNull TipoProduto tipo, @Nullable Integer ml,
                         @Nullable TamanhoPizza tamanhoPizza, @Nullable Integer quantPorcoes, Set<PorcaoPizzaDTO> porcoes, @Nullable Boolean pizzaPronta) {
    public ProdutoDTO {
        if(porcoes == null) porcoes = new HashSet<>();
    }

}
