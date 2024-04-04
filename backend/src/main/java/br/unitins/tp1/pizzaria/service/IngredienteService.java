package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.IngredienteDTO;
import br.unitins.tp1.pizzaria.dto.IngredienteResponseDTO;

import java.util.List;

public interface IngredienteService {
    IngredienteResponseDTO insert(IngredienteDTO dto);
    IngredienteResponseDTO update(Long id, IngredienteDTO dto);
    void delete(Long id);
    IngredienteResponseDTO findById(Long id);
    List<IngredienteResponseDTO> findAll(int page, int pageSize);
    Long count();
}
