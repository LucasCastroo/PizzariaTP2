package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.PorcaoPizza;

import java.util.Set;
import java.util.stream.Collectors;

public record PorcaoPizzaResponseDTO(Long id, Set<IngredienteResponseDTO> ingredientes) {
    public static PorcaoPizzaResponseDTO valueOf(PorcaoPizza porcaoPizza){
        return new PorcaoPizzaResponseDTO(
                porcaoPizza.getId(),
                porcaoPizza.getIngredientes().stream().map(IngredienteResponseDTO::valueOf).collect(Collectors.toSet())
        );
    }
}
