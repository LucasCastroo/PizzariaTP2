package br.unitins.tp1.pizzaria.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
public class PorcaoPizza extends BaseEntity {
    @ManyToMany(cascade = {CascadeType.DETACH}, fetch = FetchType.EAGER)
    @JoinTable(name = "porcao_ingrediente",
            joinColumns = {@JoinColumn(name = "id_porcao")},
            inverseJoinColumns = {@JoinColumn(name = "id_ingrediente")})
    private Set<Ingrediente> ingredientes;

    public Set<Ingrediente> getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(Set<Ingrediente> ingredientes) {
        this.ingredientes = ingredientes;
    }
}
