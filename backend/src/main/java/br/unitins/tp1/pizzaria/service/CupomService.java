package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.CupomDTO;
import br.unitins.tp1.pizzaria.dto.CupomResponseDTO;

import java.util.List;

public interface CupomService {
        CupomResponseDTO create(CupomDTO dto);
        CupomResponseDTO update(CupomDTO dto, Long id);
        void delete(Long id);
        CupomResponseDTO findById(Long id);
        CupomResponseDTO findByCodigo(String codigo);
        List<CupomResponseDTO> findAll();
}
