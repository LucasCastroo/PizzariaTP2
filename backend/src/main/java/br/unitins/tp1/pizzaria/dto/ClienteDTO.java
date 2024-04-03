package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.validation.Telefone;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;
import java.util.List;

public class ClienteDTO {
    @NotBlank(message = "Campo telefone não pode ser nulo!")
    @Size(min = 11, message = "Campo telefone deve conter no mínimo 11 caracters!")
    @Telefone
    private final String telefone;
    private final List<EnderecoDTO> enderecos;
    @NotNull
    private final Long idUsuario;

    public ClienteDTO( Long idUsuario, String telefone, List<EnderecoDTO> enderecos) {
        this.telefone = telefone;
        this.enderecos = enderecos;
        this.idUsuario = idUsuario;
    }


    public String getTelefone() {
        return telefone;
    }

    public List<EnderecoDTO> getEnderecos() {
        return enderecos;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }
}
