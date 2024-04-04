package br.unitins.tp1.pizzaria.model;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;

@Entity
public class Ingrediente extends BaseEntity {
    private String nome;
    @Enumerated(EnumType.STRING)
    private CategoriaIngrediente categoria;
    private Double preco;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public CategoriaIngrediente getCategoria() {
        return categoria;
    }

    public void setCategoria(CategoriaIngrediente categoria) {
        this.categoria = categoria;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }
}
