package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.*;
import br.unitins.tp1.pizzaria.model.Cliente;
import br.unitins.tp1.pizzaria.model.Usuario;
import br.unitins.tp1.pizzaria.repository.UsuarioRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;

@ApplicationScoped
public class UsuarioServiceImpl implements UsuarioService{

    @Inject
    UsuarioRepository repository;

    @Inject
    HashService hashService;

    @Override
    @Transactional
    public UsuarioResponseDTO insert(UsuarioDTO dto) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setCpf(dto.getCpf());
        novoUsuario.setEmail(dto.getEmail());
        novoUsuario.setNascimento(dto.getNascimento());
        novoUsuario.setNome(dto.getNome());
        novoUsuario.setSenha(hashService.getHash(dto.getSenha()));
        repository.persist(novoUsuario);
        return UsuarioResponseDTO.valueOf(novoUsuario);
    }

    @Override
    @Transactional
    public UsuarioResponseDTO update(UsuarioDTO dto, Long id) {
        Usuario usuario = repository.findById(id);
        if(usuario == null) throw new NotFoundException("Usuário não encontrado");
        if(dto.getCpf() != null) usuario.setCpf(dto.getCpf());
        if(dto.getEmail() != null) usuario.setEmail(dto.getEmail());
        if(dto.getNascimento() != null) usuario.setNascimento(dto.getNascimento());
        if(dto.getNome() != null) usuario.setNome(dto.getNome());
        repository.persistAndFlush(usuario);
        return UsuarioResponseDTO.valueOf(usuario);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public List<UsuarioResponseDTO> findAll() {
        return repository.findAll().stream().map(UsuarioResponseDTO::valueOf).toList();
    }

    @Override
    public UsuarioResponseDTO findById(Long id) {
        return UsuarioResponseDTO.valueOf(repository.findById(id));
    }

    @Override
    public List<UsuarioResponseDTO> findByNome(String nome) {
        return repository.findByNome(nome).stream().map(UsuarioResponseDTO::valueOf).toList();
    }

    @Override
    public UsuarioResponseDTO findByEmailSenha(String email, String senha) {
        return UsuarioResponseDTO.valueOf(repository.findByEmailSenha(email, senha));
    }

    @Override
    @Transactional
    public Boolean alterarSenha(AlterarSenhaDTO dto, Long id) {
        Usuario usuario = repository.findById(id);
        if(usuario != null){
            if(hashService.getHash(dto.antigaSenha()).equals(usuario.getSenha())){
                usuario.setSenha(hashService.getHash(dto.novaSenha()));
                repository.persistAndFlush(usuario);
                return true;
            }
        }
        return false;
    }

    @Override
    @Transactional
    public UsuarioResponseDTO updateImage(Long id, String fileName) {
        Usuario usuario = repository.findById(id);
        usuario.setImage(fileName);
        return UsuarioResponseDTO.valueOf(usuario);
    }


}
