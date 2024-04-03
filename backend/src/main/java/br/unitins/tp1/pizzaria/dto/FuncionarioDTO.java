package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.NivelAcesso;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.time.LocalDate;

public class FuncionarioDTO {
    @NotNull
    private final NivelAcesso tipoAcesso;
    @NotNull
    private final Long idUsuario;

    public FuncionarioDTO(NivelAcesso tipoAcesso, Long idUsuario) {
        this.tipoAcesso = tipoAcesso;
        this.idUsuario = idUsuario;
    }


    public NivelAcesso getTipoAcesso() {
        return tipoAcesso;
    }

    public Long getIdUsuario() {
        return idUsuario;
    }
}
