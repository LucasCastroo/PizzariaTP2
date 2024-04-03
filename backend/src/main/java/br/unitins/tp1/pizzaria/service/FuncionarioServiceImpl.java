package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.*;
import br.unitins.tp1.pizzaria.model.Funcionario;
import br.unitins.tp1.pizzaria.repository.FuncionarioRepository;
import br.unitins.tp1.pizzaria.repository.UsuarioRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;
@ApplicationScoped
public class FuncionarioServiceImpl implements FuncionarioService {

    @Inject
    FuncionarioRepository repository;

    @Inject
    UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public FuncionarioResponseDTO insert(FuncionarioDTO dto) {
        Funcionario novoFuncionario = new Funcionario();
        novoFuncionario.setUsuario(usuarioRepository.findById(dto.getIdUsuario()));
        novoFuncionario.setTipoAcesso(dto.getTipoAcesso());

        repository.persist(novoFuncionario);

        return FuncionarioResponseDTO.valueOf(novoFuncionario);
    }

    @Override
    @Transactional
    public FuncionarioResponseDTO update(FuncionarioDTO dto, Long id) {
        Funcionario funcionario = repository.findById(id);
        if (funcionario != null) {
            funcionario.setTipoAcesso(dto.getTipoAcesso());
            repository.persistAndFlush(funcionario);
        } else {
            throw new NotFoundException();
        }

        return FuncionarioResponseDTO.valueOf(funcionario);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.deleteById(id)) {
            throw new NotFoundException();
        }
    }
    @Override
    public List<FuncionarioResponseDTO> findAll() {
        return repository.findAll().stream().map(FuncionarioResponseDTO::valueOf).toList();
    }

    @Override
    public FuncionarioResponseDTO findById(Long id) {
        return FuncionarioResponseDTO.valueOf(repository.findById(id));
    }

    @Override
    public FuncionarioResponseDTO findByUsuarioId(Long id) {
        return FuncionarioResponseDTO.valueOf(repository.findByUsuarioId(id));
    }

}
