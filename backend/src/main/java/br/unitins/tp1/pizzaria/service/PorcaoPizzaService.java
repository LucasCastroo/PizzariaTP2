package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.PorcaoPizzaDTO;
import br.unitins.tp1.pizzaria.dto.PorcaoPizzaResponseDTO;

public interface PorcaoPizzaService {
    PorcaoPizzaResponseDTO findById(Long id);
    PorcaoPizzaResponseDTO addIngrediente(Long id, Long ingredienteId);
    PorcaoPizzaResponseDTO removeIngrediente(Long id, Long ingredienteId);
    boolean delete(Long id);
    PorcaoPizzaResponseDTO create(PorcaoPizzaDTO dto);
}
