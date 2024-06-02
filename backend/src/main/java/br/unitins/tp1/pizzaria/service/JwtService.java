package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.AuthorizationResponseDTO;
import br.unitins.tp1.pizzaria.dto.ClienteResponseDTO;
import br.unitins.tp1.pizzaria.dto.FuncionarioResponseDTO;
import br.unitins.tp1.pizzaria.dto.UsuarioResponseDTO;

public interface JwtService {
    AuthorizationResponseDTO generateJwt(UsuarioResponseDTO usuario);
}
