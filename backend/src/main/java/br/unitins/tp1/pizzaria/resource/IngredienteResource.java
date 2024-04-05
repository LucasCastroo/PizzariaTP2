package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.dto.IngredienteDTO;
import br.unitins.tp1.pizzaria.model.NivelAcesso;
import br.unitins.tp1.pizzaria.service.IngredienteService;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@Path("/ingrediente")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
public class IngredienteResource {
    @Inject
    IngredienteService service;

    @POST
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response insert(@Valid IngredienteDTO dto){
        return Response.ok(service.insert(dto)).build();
    }

    @GET
    @PermitAll
    public Response findAll(@QueryParam("page") @DefaultValue("0") int page, @QueryParam("pageSize") @DefaultValue("20") int pageSize){
        return Response.ok(service.findAll(page, pageSize)).build();
    }

    @PUT
    @Path("/update/{id}")
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response update(@PathParam("id") Long id, IngredienteDTO dto){
        return Response.ok(service.update(id, dto)).build();
    }

    @DELETE
    @Path("/delete/{id}")
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response delete(@PathParam("id") Long id){
        service.delete(id);
        return Response.accepted().build();
    }

    @GET
    @Path("/{id}")
    @PermitAll
    public Response findById(@PathParam("id") Long id){
        return Response.ok(service.findById(id)).build();
    }

    @GET
    @Path("/count")
    public Long count(){
        return service.count();
    }

    @GET
    @Path("/search")
    public Response search(@QueryParam("q") String nome){
        return Response.ok(service.findByName(nome)).build();
    }

}
