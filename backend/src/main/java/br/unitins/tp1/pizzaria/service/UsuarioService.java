package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.*;

import java.util.List;

public interface UsuarioService {
    public UsuarioResponseDTO insert(UsuarioDTO dto);
    public UsuarioResponseDTO update(UsuarioDTO dto, Long id);
    public void delete(Long id);
    public List<UsuarioResponseDTO> findAll();
    public UsuarioResponseDTO findById(Long id);
    public List<UsuarioResponseDTO> findByNome(String nome);
    public UsuarioResponseDTO findByEmailSenha(String email, String senha);
    public Boolean alterarSenha(AlterarSenhaDTO dto, Long id);
}
