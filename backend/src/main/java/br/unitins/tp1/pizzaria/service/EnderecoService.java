package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.EnderecoDTO;
import br.unitins.tp1.pizzaria.dto.EnderecoResponseDTO;

import java.util.List;

public interface EnderecoService {
    EnderecoResponseDTO insert(EnderecoDTO dto, Long idCliente);
    EnderecoResponseDTO update(EnderecoDTO dto, Long idEndereco);
    void delete(Long idEndereco);
    EnderecoResponseDTO findById(Long idEndereco);
    List<EnderecoResponseDTO> findByLogradouro(String logradouro);
}
