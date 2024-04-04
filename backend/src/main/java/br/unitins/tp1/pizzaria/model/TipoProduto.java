package br.unitins.tp1.pizzaria.model;

public enum TipoProduto {
    PIZZA,
    BEBIDA;

    @Override
    public String toString() {
        return name();
    }
}
