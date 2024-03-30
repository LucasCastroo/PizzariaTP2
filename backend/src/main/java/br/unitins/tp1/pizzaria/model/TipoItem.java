package br.unitins.tp1.pizzaria.model;

public enum TipoItem {
    PIZZA,
    BEBIDA;

    @Override
    public String toString() {
        return name();
    }
}
