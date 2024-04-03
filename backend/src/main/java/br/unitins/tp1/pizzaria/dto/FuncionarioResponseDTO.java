package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.Funcionario;
import br.unitins.tp1.pizzaria.model.NivelAcesso;

import java.time.LocalDate;

public record FuncionarioResponseDTO(
    Long id,
    UsuarioResponseDTO usuario,
    NivelAcesso tipoAcesso
) {
    public static FuncionarioResponseDTO valueOf(Funcionario funcionario) {
        try {
            return new FuncionarioResponseDTO(
                    funcionario.getId(),
                    UsuarioResponseDTO.valueOf(funcionario.getUsuario()),
                    funcionario.getTipoAcesso()
            );
        }catch (NullPointerException e){
            return null;
        }
    }
}
