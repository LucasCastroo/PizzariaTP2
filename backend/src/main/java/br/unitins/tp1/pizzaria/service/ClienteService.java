package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.ClienteDTO;
import br.unitins.tp1.pizzaria.dto.ClienteResponseDTO;
import br.unitins.tp1.pizzaria.dto.TelefoneDTO;

import java.util.List;

public interface ClienteService {
     ClienteResponseDTO insert(ClienteDTO dto);
     ClienteResponseDTO update(ClienteDTO dto, Long id);
     void delete(Long id);
     ClienteResponseDTO findById(Long id);
     List<ClienteResponseDTO> findAll();
     ClienteResponseDTO findByUsuarioId(Long id);
     ClienteResponseDTO alterarTelefone(TelefoneDTO telefone, Long id);
}
