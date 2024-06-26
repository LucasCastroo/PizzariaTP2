package br.unitins.tp1.pizzaria.resource;

import br.unitins.tp1.pizzaria.application.Error;
import br.unitins.tp1.pizzaria.dto.ProdutoDTO;
import br.unitins.tp1.pizzaria.form.ImageForm;
import br.unitins.tp1.pizzaria.model.NivelAcesso;
import br.unitins.tp1.pizzaria.model.TipoProduto;
import br.unitins.tp1.pizzaria.service.ProdutoImageService;
import br.unitins.tp1.pizzaria.service.ProdutoService;
import io.quarkus.logging.Log;
import jakarta.annotation.security.PermitAll;
import jakarta.annotation.security.RolesAllowed;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.core.Response.ResponseBuilder;
import org.jboss.resteasy.annotations.providers.multipart.MultipartForm;

import java.io.IOException;

import static io.quarkus.arc.ComponentsProvider.LOG;

@Consumes(MediaType.APPLICATION_JSON)
@Produces(MediaType.APPLICATION_JSON)
@ApplicationScoped
@Path("/produto")
public class ProdutoResource {
    @Inject
    ProdutoService service;

    @Inject
    ProdutoImageService imageService;


    @POST
    @Path("/create/")
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response create(ProdutoDTO dto) {
        LOG.infof("Item %s cadastrado", dto.nome());
        return Response.status(Response.Status.CREATED).entity(service.create(dto)).build();
    }

    @PUT
    @Path("/update/{id}")
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response update(ProdutoDTO dto, @PathParam("id") Long id) {
        LOG.infof("Item %s autualizado", dto.nome());
        return Response.status(Response.Status.ACCEPTED).entity(service.update(id, dto)).build();
    }

    @GET
    @Path("/{id}")
    public Response findById(@PathParam("id") Long id) {
        return Response.ok().entity(service.findById(id)).build();
    }

    @GET
    @Path("/image/{nomeImagem}")
    @PermitAll
    @Produces(MediaType.APPLICATION_OCTET_STREAM)
    public Response getImage(@PathParam("nomeImagem") String nomeImagem) {
        ResponseBuilder response = Response.ok(imageService.obter(nomeImagem));
        response.header("Content-Disposition", "attachment;filename=" + nomeImagem);
        return response.build();
    }

    @PATCH
    @Path("/image/{id}")
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    @Consumes(MediaType.MULTIPART_FORM_DATA)
    public Response salvarImagem(@MultipartForm ImageForm form, @PathParam("id") Long id) {
        String nomeImagem;
        try {
            String old = service.findById(id).nomeImagem();
            if(old != null && !old.isBlank()){
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

    @GET
    @PermitAll
    public Response listAll(
            @QueryParam("page") @DefaultValue("0") int page,
            @QueryParam("pageSize") @DefaultValue("20") int pageSize,
            @QueryParam("tipo") @DefaultValue("") String tipo
    ){

        return Response.ok(service.findAll(page, pageSize, tipo)).build();
    }

    @GET
    @Path("/count/pizza")
    @PermitAll
    public Long countPizzas(){
        return service.count(TipoProduto.PIZZA);
    }

    @GET
    @Path("/count/bebida")
    @PermitAll
    public Long countBebida(){
        return service.count(TipoProduto.BEBIDA);
    }

    @DELETE
    @Path("/delete/{id}")
    @RolesAllowed({NivelAcesso.Role.GERENTE, NivelAcesso.Role.ADMIN})
    public Response delete(@PathParam("id") Long id){
        service.delete(id);
        return Response.accepted().build();
    }


}