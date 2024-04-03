package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.*;
import br.unitins.tp1.pizzaria.model.Cliente;
import br.unitins.tp1.pizzaria.model.Endereco;
import br.unitins.tp1.pizzaria.repository.ClienteRepository;
import br.unitins.tp1.pizzaria.repository.UsuarioRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.Collections;
import java.util.List;

@ApplicationScoped
public class ClienteServiceImpl implements ClienteService {

    @Inject
    ClienteRepository repository;

    @Inject
    UsuarioRepository usuarioRepository;


    @Override
    @Transactional
    public ClienteResponseDTO insert(ClienteDTO dto) {
        Cliente novoCliente = new Cliente();
        novoCliente.setUsuario(usuarioRepository.findById(dto.getIdUsuario()));
        novoCliente.setTelefone(dto.getTelefone());
        if(dto.getEnderecos() != null) novoCliente.setEnderecos(dto.getEnderecos().stream().map(e -> new Endereco(e.getLogradouro(), e.getBairro(), e.getCidade(), e.getCep())).toList());
        else novoCliente.setEnderecos(Collections.emptyList());

        repository.persist(novoCliente);

        return ClienteResponseDTO.valueOf(novoCliente);
    }

    @Override
    @Transactional
    public ClienteResponseDTO update(ClienteDTO dto, Long id) {
        Cliente cliente = repository.findById(id);
        if (cliente != null) {
            cliente.setTelefone(dto.getTelefone());
            cliente.getEnderecos().clear();
            cliente.getEnderecos().addAll(dto.getEnderecos().stream().map(e -> new Endereco(e.getLogradouro(), e.getBairro(), e.getCidade(), e.getCep())).toList());
            repository.persistAndFlush(cliente);
        } else {
            throw new NotFoundException();
        }

        return ClienteResponseDTO.valueOf(cliente);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.deleteById(id)) {
            throw new NotFoundException();
        }
    }

    @Override
    public ClienteResponseDTO findById(Long id) {
        return ClienteResponseDTO.valueOf(repository.findById(id));
    }

    @Override
    public List<ClienteResponseDTO> findAll() {
        return repository.listAll().stream()
                .map(ClienteResponseDTO::valueOf).toList();
    }

    @Override
    public ClienteResponseDTO findByUsuarioId(Long id) {
        return ClienteResponseDTO.valueOf(repository.findByUsuarioId(id));
    }

    @Override
    @Transactional
    public ClienteResponseDTO alterarTelefone(TelefoneDTO telefone, Long id) {
        Cliente cliente = repository.findById(id);
        cliente.setTelefone(telefone.telefone());
        repository.persistAndFlush(cliente);
        return ClienteResponseDTO.valueOf(cliente);
    }
}
