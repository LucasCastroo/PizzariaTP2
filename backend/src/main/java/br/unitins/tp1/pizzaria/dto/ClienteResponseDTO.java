package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.Cliente;

import java.time.LocalDate;
import java.util.List;

public record ClienteResponseDTO(
        Long id,
        String telefone,
        List<EnderecoResponseDTO> enderecos,
        UsuarioResponseDTO usuario
) {
    public static ClienteResponseDTO valueOf(Cliente cliente) {
        try{
            return new ClienteResponseDTO(
                    cliente.getId(),
                    cliente.getTelefone(),
                    cliente.getEnderecos().stream().map(EnderecoResponseDTO::valueOf).toList(),
                    UsuarioResponseDTO.valueOf(cliente.getUsuario())
            );
        }catch (NullPointerException e){
            return null;
        }

    }
}
