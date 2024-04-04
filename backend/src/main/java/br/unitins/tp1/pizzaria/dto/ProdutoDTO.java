package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.TamanhoPizza;
import br.unitins.tp1.pizzaria.model.TipoProduto;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public abstract class ProdutoDTO {
    @NotBlank
    public final String nome;
    @NotBlank
    public final String descricao;
    @Positive
    public final Double preco;
    @Positive
    public final Integer kCal;
    @NotBlank
    public final TipoProduto tipo;
    @Nullable
    public final Integer ml;
    @Nullable
    public final TamanhoPizza tamanhoPizza;
    @Nullable
    public final String ingredientes;
    @Nullable
    public final Integer tempoDePreparo;


    public ProdutoDTO(String nome, String descricao, Double preco, Integer kCal, TipoProduto tipo, @Nullable Integer ml, @Nullable TamanhoPizza tamanhoPizza, @Nullable String ingredientes, @Nullable Integer tempoDePreparo) {
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.kCal = kCal;
        this.tipo = tipo;
        this.ml = ml;
        this.tamanhoPizza = tamanhoPizza;
        this.ingredientes = ingredientes;
        this.tempoDePreparo = tempoDePreparo;
    }

    public String getNome() {
        return nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public Integer getkCal() {
        return kCal;
    }

    public TipoProduto getTipo() {
        return tipo;
    }

    @Nullable
    public Integer getMl() {
        return ml;
    }

    @Nullable
    public TamanhoPizza getTamanhoPizza() {
        return tamanhoPizza;
    }

    @Nullable
    public String getIngredientes() {
        return ingredientes;
    }

    @Nullable
    public Integer getTempoDePreparo() {
        return tempoDePreparo;
    }
}
