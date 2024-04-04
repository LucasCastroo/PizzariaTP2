package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.CategoriaIngrediente;
import br.unitins.tp1.pizzaria.model.Ingrediente;

public record IngredienteResponseDTO(Long id, String nome, CategoriaIngrediente categoria, Double preco) {
    public static IngredienteResponseDTO valueOf(Ingrediente ingrediente){
        return new IngredienteResponseDTO(
                ingrediente.getId(),
                ingrediente.getNome(),
                ingrediente.getCategoria(),
                ingrediente.getPreco()
        );
    }
}
