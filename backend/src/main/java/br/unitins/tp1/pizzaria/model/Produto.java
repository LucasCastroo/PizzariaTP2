package br.unitins.tp1.pizzaria.model;

import jakarta.persistence.*;

@Entity
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "tipo")
public abstract class Produto extends BaseEntity {
    private String nome;
    private String descricao;
    private Double preco;
    private Integer kCal;
    private String nomeImagem;

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getkCal() {
        return kCal;
    }

    public void setkCal(Integer kCal) {
        this.kCal = kCal;
    }

    public String getNomeImagem() {
        return nomeImagem;
    }

    public void setNomeImagem(String nomeImagem) {
        this.nomeImagem = nomeImagem;
    }

    public TipoProduto getTipo(){
        return TipoProduto.valueOf(this.getClass().getAnnotation(DiscriminatorValue.class).value());

    }
}
