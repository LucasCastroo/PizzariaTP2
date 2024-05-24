package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.application.Error;
import br.unitins.tp1.pizzaria.dto.AlterarSenhaDTO;
import br.unitins.tp1.pizzaria.dto.UsuarioDTO;
import br.unitins.tp1.pizzaria.form.ImageForm;
import br.unitins.tp1.pizzaria.model.Cliente;
import br.unitins.tp1.pizzaria.model.Funcionario;
import br.unitins.tp1.pizzaria.service.UsuarioImageService;
import br.unitins.tp1.pizzaria.service.UsuarioService;
import io.quarkus.logging.Log;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.IOException;

import static io.quarkus.arc.ComponentsProvider.LOG;

@Path("/usuario")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioResource {
    @Inject
    UsuarioService service;

    @Inject
    UsuarioImageService imageService;

    @POST
    public Response insert(@Valid UsuarioDTO dto){
        return Response.ok(service.insert(dto)).build();
    }

    @PUT
    @Path("/update/{id}")
    public Response update(@PathParam("id") Long id, UsuarioDTO dto){
        return Response.ok(service.update(dto, id)).build();
    }

    @DELETE
    @Path("/delete/{id}")
    public Response delete(@PathParam("id") Long id){
        service.delete(id);
        return Response.accepted().build();
    }

    @GET
    public Response findAll(){
        return Response.ok(service.findAll()).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id){
        return Response.ok(service.findById(id)).build();
    }

    @POST
    @Path("/alterar-senha/{id}")
    public Response alterarSenha(AlterarSenhaDTO dto, @PathParam("id") Long id){
        return service.alterarSenha(dto, id) ? Response.accepted().build() : Response.status(Response.Status.UNAUTHORIZED).build();
    }

    @GET
    @Path("/image/{nomeImagem}")
    @PermitAll
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getImage(@PathParam("nomeImagem") String nomeImagem) {
        Response.ResponseBuilder response = Response.ok(imageService.obter(nomeImagem));
        response.header("Content-Disposition", "attachment;filename=" + nomeImagem);
        return response.build();
    }

    @PATCH
    @Path("/image/{id}")
    @RolesAllowed({Cliente.ROLE, Funcionario.ROLE})
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response salvarImagem(@MultipartForm ImageForm form, @PathParam("id") Long id) {
        String nomeImagem;
        try {
            String old = service.findById(id).nomeImagem();
            if(!old.isBlank()){
                imageService.remover(old);
            }
            nomeImagem = imageService.salvar(form.getNomeImagem(), form.getImagem());
        } catch (IOException e) {
            Log.error(e);
            Error error = new Error("409", e.getMessage());
            return Response.status(Response.Status.CONFLICT).entity(error).build();
        }
        LOG.infof("Imagem do item %d autualizada", id);
        return Response.ok(service.updateImage(id, nomeImagem)).build();
    }
}
