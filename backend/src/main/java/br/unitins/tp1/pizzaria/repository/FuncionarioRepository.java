package br.unitins.tp1.pizzaria.repository;

import br.unitins.tp1.pizzaria.model.Cliente;
import br.unitins.tp1.pizzaria.model.Funcionario;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import io.quarkus.logging.Log;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.persistence.NoResultException;

import java.util.List;

@ApplicationScoped
public class FuncionarioRepository implements PanacheRepository<Funcionario> {

    public Funcionario findByUsuarioId(Long id){
        try {
            return find("usuario.id = ?1", id).singleResult();
        }catch (NoResultException e){
            return null;
        }
    }
}
