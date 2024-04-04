package br.unitins.tp1.pizzaria.model;

import jakarta.persistence.DiscriminatorValue;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;


@Entity
@DiscriminatorValue("PIZZA")
public class Pizza extends Produto {
    @Enumerated(EnumType.STRING)
    private TamanhoPizza tamanhoPizza;
    private String ingredientes;
    private Integer tempoDePreparo;

    public TamanhoPizza getTamanhoPizza() {
        return tamanhoPizza;
    }

    public void setTamanhoPizza(TamanhoPizza tamanhoPizza) {
        this.tamanhoPizza = tamanhoPizza;
    }

    public String getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(String ingredientes) {
        this.ingredientes = ingredientes;
    }

    public Integer getTempoDePreparo() {
        return tempoDePreparo;
    }

    public void setTempoDePreparo(Integer tempoDePreparo) {
        this.tempoDePreparo = tempoDePreparo;
    }
}
