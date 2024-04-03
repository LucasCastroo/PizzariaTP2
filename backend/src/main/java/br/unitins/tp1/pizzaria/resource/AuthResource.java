package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.dto.*;
import br.unitins.tp1.pizzaria.service.*;
import io.quarkus.logging.Log;
import jakarta.annotation.security.PermitAll;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;

@Path("/auth")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@PermitAll
public class AuthResource {
    @Inject
    UsuarioService service;

    @Inject
    HashService hashService;
    @Inject
    JwtService jwtService;

    private static final Logger LOG = Logger.getLogger(AuthResource.class);

    @POST
    public Response login(@Valid LoginDTO dto){
        try {
            String hashed = hashService.getHash(dto.senha());
            UsuarioResponseDTO usuario = service.findByEmailSenha(dto.email(), hashed);
            if (usuario == null) {
                LOG.errorf("Login de %s mal sucedido!", dto.email());
                return Response.status(Response.Status.UNAUTHORIZED).entity("Credenciais inválidas").build();
            }
            LOG.infof("Login de %s feito com sucesso!", dto.email());
            return Response.ok().entity(jwtService.generateJwt(usuario)).build();
        } catch (Exception e) {
            Log.error(e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity("Erro interno do servidor").build();
        }
    }
}
