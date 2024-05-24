package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.application.Error;
import br.unitins.tp1.pizzaria.dto.*;
import br.unitins.tp1.pizzaria.form.ImageForm;
import br.unitins.tp1.pizzaria.model.Cliente;
import br.unitins.tp1.pizzaria.model.Funcionario;
import br.unitins.tp1.pizzaria.service.UsuarioImageService;
import br.unitins.tp1.pizzaria.service.UsuarioService;
import io.quarkus.logging.Log;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.IOException;

import static io.quarkus.arc.ComponentsProvider.LOG;

@Path("/minha-conta")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@RolesAllowed({Cliente.ROLE, Funcionario.ROLE})
public class UsuarioLogadoResource {
    @Inject
    @Claim("sub")
    Long idUsuario;
    @Inject
    JsonWebToken jwt;

    @Inject
    UsuarioImageService imageService;

    @Inject
    UsuarioService service;

    @GET
    public Response minhaConta() {
        return Response.ok(service.findById(idUsuario)).build();
    }

    @PATCH
    @Path("/alterar-senha")
    public Response alterarSenha(@Valid AlterarSenhaDTO dto) {
        try {
            service.alterarSenha(dto, idUsuario);
            Log.info("Senha alterada");
            return Response.noContent().build();
        } catch (Exception e) {
            Log.error("Erro ao alterar a senha: ", e);
            return Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                    .entity("Erro interno do servidor ao alterar a senha.").build();
        }
    }

    @PATCH
    @Path("/update")
    public Response update(UsuarioDTO dto) {
        return Response.ok(service.update(dto, idUsuario)).build();
    }

    @PATCH
    @Path("/image")
    @RolesAllowed({Cliente.ROLE, Funcionario.ROLE})
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response salvarImagem(@MultipartForm ImageForm form) {
        String nomeImagem;
        try {
            String old = service.findById(idUsuario).nomeImagem();
            if(old != null){
                imageService.remover(old);
            }
            nomeImagem = imageService.salvar(form.getNomeImagem(), form.getImagem());
        } catch (IOException e) {
            Log.error(e);
            Error error = new Error("409", e.getMessage());
            return Response.status(Response.Status.CONFLICT).entity(error).build();
        }
        LOG.infof("Imagem do item %d autualizada", idUsuario);
        return Response.ok(service.updateImage(idUsuario, nomeImagem)).build();
    }
}
