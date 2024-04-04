package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.CategoriaIngrediente;
import jakarta.persistence.EnumType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;

public record IngredienteDTO(@NotBlank String nome, @NotNull CategoriaIngrediente categoria, @Positive @NotNull Double preco) {
}
