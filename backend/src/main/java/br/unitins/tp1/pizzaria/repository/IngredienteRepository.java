package br.unitins.tp1.pizzaria.repository;

import br.unitins.tp1.pizzaria.model.Ingrediente;
import io.quarkus.hibernate.orm.panache.PanacheRepository;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class IngredienteRepository implements PanacheRepository<Ingrediente> {
}
