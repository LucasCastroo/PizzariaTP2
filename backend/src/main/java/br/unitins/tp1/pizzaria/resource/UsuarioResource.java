package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.dto.AlterarSenhaDTO;
import br.unitins.tp1.pizzaria.dto.UsuarioDTO;
import br.unitins.tp1.pizzaria.service.UsuarioService;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/usuario")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class UsuarioResource {
    @Inject
    UsuarioService service;

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
}
