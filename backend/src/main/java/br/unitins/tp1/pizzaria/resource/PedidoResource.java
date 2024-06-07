package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.dto.PedidoDTO;
import br.unitins.tp1.pizzaria.dto.StatusPedidoDTO;
import br.unitins.tp1.pizzaria.model.Cliente;
import br.unitins.tp1.pizzaria.model.Funcionario;
import br.unitins.tp1.pizzaria.model.NivelAcesso;
import br.unitins.tp1.pizzaria.model.Status;
import br.unitins.tp1.pizzaria.service.PedidoService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.jwt.Claim;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.jboss.logging.Logger;

@Path("/pedido")
@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
public class PedidoResource {
    @Inject
    JsonWebToken jwt;

    @Inject
    PedidoService service;


    @POST
    @Path("/")
    @RolesAllowed(Cliente.ROLE)
    public Response create(PedidoDTO dto){
        return Response.status(Response.Status.CREATED).entity(service.create(dto, Long.valueOf(jwt.getSubject()))).build();
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed({Cliente.ROLE, NivelAcesso.Role.SUPERVISOR})
    public Response update(PedidoDTO dto, @PathParam("id") Long id) {
        return Response.status(Response.Status.ACCEPTED).entity(service.update(dto, id)).build();
    }

    @PATCH
    @Path("/{id}/status")
    @RolesAllowed({NivelAcesso.Role.SUPERVISOR, NivelAcesso.Role.ATENDENTE, NivelAcesso.Role.ADMIN})
    public Response updateStatus(StatusPedidoDTO dto, @PathParam("id") Long id){
        return Response.status(Response.Status.ACCEPTED).entity(service.updateStatus(dto, id)).build();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({NivelAcesso.Role.ADMIN})
    public Response delete(@PathParam("id") Long id){
        service.delete(id);
        return Response.noContent().build();
    }

    @GET
    @Path("/{id}")
    @RolesAllowed({Cliente.ROLE, Funcionario.ROLE})
    public Response findById(@PathParam("id") Long id){
        return Response.ok().entity(service.findById(id)).build();
    }

    @GET
    @RolesAllowed(Cliente.ROLE)
    public Response findByClienteId(){
        return Response.ok().entity(service.findByClienteId(Long.valueOf(jwt.getSubject()))).build();
    }

    @PATCH
    @Path("/{id}/pagar")
    @RolesAllowed(Cliente.ROLE)
    public Response pagar(@PathParam("id") Long id) {
        service.updateStatus(new StatusPedidoDTO(Status.EM_PREPARO), id);
        return Response.accepted().build();

    }
}
