package br.unitins.tp1.pizzaria.repository;

import br.unitins.tp1.pizzaria.model.Ingrediente;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.List;

@ApplicationScoped
public class IngredienteRepository implements PanacheRepository<Ingrediente> {
    public List<Ingrediente> findByNome(String nome){
        return find("LOWER(nome) like LOWER(?1) ORDER BY nome LIMIT 10", "%" + nome + "%").list();
    }
}
