package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.Cliente;

import java.time.LocalDate;
import java.util.List;

public record ClienteResponseDTO(
        Long id,
        String telefone,
        List<EnderecoDTO> enderecos,
        UsuarioResponseDTO usuario
) {
    public static ClienteResponseDTO valueOf(Cliente cliente) {
        try{
            return new ClienteResponseDTO(
                    cliente.getId(),
                    cliente.getTelefone(),
                    cliente.getEnderecos().stream().map(e -> new EnderecoDTO(e.getLogradouro(), e.getBairro(), e.getCidade(), e.getCep())).toList(),
                    UsuarioResponseDTO.valueOf(cliente.getUsuario())
            );
        }catch (NullPointerException e){
            return null;
        }

    }
}
