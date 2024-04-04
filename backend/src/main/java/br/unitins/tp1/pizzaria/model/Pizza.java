package br.unitins.tp1.pizzaria.model;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;


@Entity
@DiscriminatorValue("PIZZA")
public class Pizza extends Produto {

    @Enumerated(EnumType.STRING)
    private TamanhoPizza tamanhoPizza;

    private Integer quantPorcoes;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PorcaoPizza> porcoes = new HashSet<>();

    private Boolean pizzaPronta;

    public TamanhoPizza getTamanhoPizza() {
        return tamanhoPizza;
    }

    public void setTamanhoPizza(TamanhoPizza tamanhoPizza) {
        this.tamanhoPizza = tamanhoPizza;
    }

    public Integer getQuantPorcoes() {
        return quantPorcoes;
    }

    public void setQuantPorcoes(Integer quantPorcoes) {
        this.quantPorcoes = quantPorcoes;
    }

    public Set<PorcaoPizza> getPorcoes() {
        return porcoes;
    }

    public void setPorcoes(Set<PorcaoPizza> porcoes) {
        this.porcoes = porcoes;
    }

    public Boolean getPizzaPronta() {
        return pizzaPronta;
    }

    public void setPizzaPronta(Boolean pizzaPronta) {
        this.pizzaPronta = pizzaPronta;
    }
}
