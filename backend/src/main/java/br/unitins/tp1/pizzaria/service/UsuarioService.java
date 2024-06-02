package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.*;

import java.util.List;

public interface UsuarioService {
    UsuarioResponseDTO insert(UsuarioDTO dto);
    UsuarioResponseDTO update(UsuarioDTO dto, Long id);
    void delete(Long id);
    List<UsuarioResponseDTO> findAll();
    UsuarioResponseDTO findById(Long id);
    List<UsuarioResponseDTO> findByNome(String nome);
    UsuarioResponseDTO findByEmailSenha(String email, String senha);
    Boolean alterarSenha(AlterarSenhaDTO dto, Long id);
    UsuarioResponseDTO updateImage(Long id, String fileName);
}
