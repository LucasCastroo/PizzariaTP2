package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.Usuario;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import org.hibernate.validator.constraints.br.CPF;

import java.time.LocalDate;
import java.util.Objects;

public class UsuarioDTO {
    @NotBlank(message = "Campo nome não pode ser nulo!")
    private String nome;
    @NotBlank(message = "Campo cpf não pode ser nulo!")
    @CPF
    private String cpf;
    @NotBlank(message = "Campo email não pode ser nulo!")
    private String email;
    @NotBlank(message = "Campo senha não pode ser nulo!")
    @Size(min = 6, message = "Senha deve ter no mínimo 6 caracters!")
    private String senha;

    @NotNull
    @Past
    private LocalDate nascimento;

    public UsuarioDTO(String nome, String cpf, String email, String senha, LocalDate nascimento) {
        this.nome = nome;
        this.cpf = cpf;
        this.email = email;
        this.senha = senha;
        this.nascimento = nascimento;
    }

    public String getNome() {
        return nome;
    }

    public String getCpf() {
        return cpf;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public LocalDate getNascimento() {
        return nascimento;
    }

    public void setNome(@NotBlank(message = "Campo nome não pode ser nulo!") String nome) {
        this.nome = nome;
    }

    public void setCpf(@NotBlank(message = "Campo cpf não pode ser nulo!") @CPF String cpf) {
        this.cpf = cpf;
    }

    public void setEmail(@NotBlank(message = "Campo email não pode ser nulo!") String email) {
        this.email = email;
    }

    public void setSenha(@NotBlank(message = "Campo senha não pode ser nulo!") @Size(min = 6, message = "Senha deve ter no mínimo 6 caracters!") String senha) {
        this.senha = senha;
    }

    public void setNascimento(@NotNull @Past LocalDate nascimento) {
        this.nascimento = nascimento;
    }

    @Override
    public int hashCode() {
        return Objects.hash(nome, cpf, email, senha, nascimento);
    }


}
