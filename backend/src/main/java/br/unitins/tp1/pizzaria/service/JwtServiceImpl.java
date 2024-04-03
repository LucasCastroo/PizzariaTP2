package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.AuthorizationResponseDTO;
import br.unitins.tp1.pizzaria.dto.ClienteResponseDTO;
import br.unitins.tp1.pizzaria.dto.FuncionarioResponseDTO;
import br.unitins.tp1.pizzaria.dto.UsuarioResponseDTO;
import br.unitins.tp1.pizzaria.model.Cliente;
import br.unitins.tp1.pizzaria.model.Funcionario;
import br.unitins.tp1.pizzaria.repository.ClienteRepository;
import br.unitins.tp1.pizzaria.repository.FuncionarioRepository;
import io.smallrye.jwt.build.Jwt;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@ApplicationScoped
public class JwtServiceImpl implements JwtService{
    @Inject
    ClienteRepository clienteRepository;

    @Inject
    FuncionarioRepository funcionarioRepository;

    private static final Duration TOKEN_DURATION = Duration.ofHours(24);

    private Instant getExpiration(){
        return Instant.now().plus(TOKEN_DURATION);
    }

    @Override
    public AuthorizationResponseDTO generateJwt(UsuarioResponseDTO usuario) {
        Set<String> roles = new HashSet<>();
        if(clienteRepository.findByUsuarioId(usuario.id()) != null) roles.add(Cliente.ROLE);
        Funcionario funcionario = funcionarioRepository.findByUsuarioId(usuario.id());
        if(funcionario!= null) roles.addAll(Set.of(Funcionario.ROLE, funcionario.getTipoAcesso().name()));
        String token = Jwt.issuer("pizzaria-jwt")
                .subject(String.valueOf(usuario.id()))
                .upn(usuario.email())
                .groups(roles)
                .expiresAt(getExpiration())
                .sign();

        return new AuthorizationResponseDTO(token, LocalDateTime.now().plus(TOKEN_DURATION));
    }
}
