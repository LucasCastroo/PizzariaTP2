package br.unitins.tp1.pizzaria.model;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class ProdutoPedido extends BaseEntity {
    private Double preco;
    private Integer quant;
    @ManyToOne
    @JoinColumn(name = "id_produto")
    private Produto produto;
    private String tamanho;

    public Double getPreco() {
        return preco;
    }

    public void setPreco(Double preco) {
        this.preco = preco;
    }

    public Integer getQuant() {
        return quant;
    }

    public void setQuant(Integer quant) {
        this.quant = quant;
    }

    public Produto getItem() {
        return produto;
    }

    public void setItem(Produto produto) {
        this.produto = produto;
    }

    public String getTamanho() {
        return tamanho;
    }

    public void setTamanho(String tamanho) {
        this.tamanho = tamanho;
    }
}
