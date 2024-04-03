package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.FuncionarioDTO;
import br.unitins.tp1.pizzaria.dto.FuncionarioResponseDTO;

import java.util.List;

public interface FuncionarioService {
    public FuncionarioResponseDTO insert(FuncionarioDTO dto);
    public FuncionarioResponseDTO update(FuncionarioDTO dto, Long id);
    public void delete(Long id);
    public List<FuncionarioResponseDTO> findAll();
    public FuncionarioResponseDTO findById(Long id);
    public FuncionarioResponseDTO findByUsuarioId(Long id);

}
