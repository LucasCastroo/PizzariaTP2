package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.dto.FuncionarioDTO;
import br.unitins.tp1.pizzaria.dto.FuncionarioResponseDTO;
import br.unitins.tp1.pizzaria.model.Funcionario;
import br.unitins.tp1.pizzaria.model.NivelAcesso;
import br.unitins.tp1.pizzaria.service.FuncionarioService;
import jakarta.annotation.security.RolesAllowed;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.Status;
import org.jboss.logging.Logger;

@Path("/funcionarios")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class FuncionarioResource {

    @Inject
    FuncionarioService service;

    private static final Logger LOG = Logger.getLogger(AuthResource.class);

    @POST
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response insert(@Valid FuncionarioDTO dto) {
        FuncionarioResponseDTO retorno = service.insert(dto);
        LOG.infof("Novo funcionario %s cadastrado!", retorno.id());
        return Response.status(201).entity(retorno).build();
    }

    @GET
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response findAll(){
        return Response.ok(service.findAll()).build();
    }

    @PUT
    @Path("/{id}")
    @RolesAllowed({Funcionario.ROLE})
    @Transactional
    public Response update(FuncionarioDTO dto, @PathParam("id") Long id) {
        service.update(dto, id);
        return Response.status(Status.NO_CONTENT).build();
    }

    @DELETE
    @Path("/{id}")
    @RolesAllowed({Funcionario.ROLE, NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response delete(@PathParam("id") Long id) {
        service.delete(id);
        LOG.infof("Funcionario id=%d deletado!", id);
        return Response.status(Status.NO_CONTENT).build();
    }

    @GET
    @Path("/search/id/{id}")
    @RolesAllowed({NivelAcesso.Role.SUPERVISOR, NivelAcesso.Role.GERENTE,NivelAcesso.Role.ADMIN})
    public Response findById(@PathParam("id") Long id) {
        LOG.infof("Busca de um funcionario por %d", id);
        return Response.ok(service.findById(id)).build();
    }

    @GET
    @Path("/search/usuario/{id}")
    @RolesAllowed({NivelAcesso.Role.SUPERVISOR, NivelAcesso.Role.GERENTE,NivelAcesso.Role.ADMIN})
    public Response findByNome(@PathParam("id") Long id) {
        LOG.infof("Busca de funcionario por usuario %l", id);
        return Response.ok(service.findByUsuarioId(id)).build();
    }
}
