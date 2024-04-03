package br.unitins.tp1.pizzaria.repository;

import br.unitins.tp1.pizzaria.model.Cliente;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.NoResultException;


@ApplicationScoped
public class ClienteRepository implements PanacheRepository<Cliente> {
    public Cliente findByUsuarioId(Long id){
        try {
            return find("usuario.id = ?1", id).singleResult();
        }catch (NoResultException e){
            return null;
        }
    }
}
