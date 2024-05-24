package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.Usuario;

import java.time.LocalDate;

public record UsuarioResponseDTO(Long id, String nome, String cpf, String email, String senha, LocalDate nascimento, String nomeImagem) {
    public static UsuarioResponseDTO valueOf(Usuario usuario) {
        return new UsuarioResponseDTO(usuario.getId(), usuario.getNome(), usuario.getCpf(), usuario.getEmail(), usuario.getSenha(), usuario.getNascimento(), usuario.getImage());
    }
}