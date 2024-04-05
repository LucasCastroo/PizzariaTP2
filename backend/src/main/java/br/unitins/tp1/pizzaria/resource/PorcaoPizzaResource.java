package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.dto.PorcaoPizzaDTO;
import br.unitins.tp1.pizzaria.service.PorcaoPizzaService;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

@ApplicationScoped
@Path("/pizza/porcao")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PorcaoPizzaResource {

    @Inject
    PorcaoPizzaService service;

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id){
        return Response.ok(service.findById(id)).build();
    }

    @PATCH
    @Path("/{id}/add/{ingredienteId}")
    public Response addIngrediente(@PathParam("id") Long id, @PathParam("ingredienteId") Long ingredienteId){
        return Response.ok(service.addIngrediente(id, ingredienteId)).build();
    }

    @PATCH
    @Path("/{id}/remove/{ingredienteId}")
    public Response removeIngrediente(@PathParam("id") Long id, @PathParam("ingredienteId") Long ingredienteId){
        return Response.ok(service.removeIngrediente(id, ingredienteId)).build();
    }

    @DELETE
    @Path("/{id}")
    public Response delete(@PathParam("id") Long id){
        service.delete(id);
        return Response.accepted().build();
    }

    @POST
    @Path("/create")
    public Response create(@Valid PorcaoPizzaDTO dto){
        return Response.ok(service.create(dto)).build();
    }
}
