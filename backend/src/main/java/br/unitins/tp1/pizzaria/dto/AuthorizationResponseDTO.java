package br.unitins.tp1.pizzaria.dto;

import java.time.LocalDateTime;

public record AuthorizationResponseDTO(
        String token,
        LocalDateTime expiry
) {
}
