package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.FuncionarioDTO;
import br.unitins.tp1.pizzaria.dto.FuncionarioResponseDTO;

import java.util.List;

public interface FuncionarioService {
    FuncionarioResponseDTO insert(FuncionarioDTO dto);
    FuncionarioResponseDTO update(FuncionarioDTO dto, Long id);
    void delete(Long id);
    List<FuncionarioResponseDTO> findAll();
    FuncionarioResponseDTO findById(Long id);
    FuncionarioResponseDTO findByUsuarioId(Long id);

}
