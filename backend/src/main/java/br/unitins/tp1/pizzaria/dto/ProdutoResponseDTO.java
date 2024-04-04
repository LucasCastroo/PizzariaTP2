package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.*;

public class ProdutoResponseDTO {
    private final Long id;
    private final String nome;
    private final String descricao;
    private final Double preco;
    private final Integer kCal;
    private final String nomeImagem;
    private final TipoProduto tipo;
    private final Integer ml;
    private final TamanhoPizza tamanhoPizza;
    private final String ingredientes;
    private final Integer tempoDePreparo;

    public ProdutoResponseDTO(Long id, String nome, String descricao, Double preco, Integer kCal, String nomeImagem, TipoProduto tipo, Integer ml, TamanhoPizza tamanhoPizza, String ingredientes, Integer tempoDePreparo) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.kCal = kCal;
        this.nomeImagem = nomeImagem;
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

    public String getNomeImagem() {
        return nomeImagem;
    }

    public Long getId() {
        return id;
    }

    public TipoProduto getTipo() {
        return tipo;
    }

    public Integer getMl() {
        return ml;
    }

    public TamanhoPizza getTamanhoPizza() {
        return tamanhoPizza;
    }

    public String getIngredientes() {
        return ingredientes;
    }

    public Integer getTempoDePreparo() {
        return tempoDePreparo;
    }

    public static ProdutoResponseDTO valueOf(Produto produto){
        TipoProduto tipo = produto.getTipo();
        Integer ml = null;
        TamanhoPizza tam = null;
        String ingr = null;
        Integer temp = null;
        if(tipo == TipoProduto.PIZZA){
            tam = ((Pizza) produto).getTamanhoPizza();
            ingr = ((Pizza) produto).getIngredientes();
            temp = ((Pizza) produto).getTempoDePreparo();
        } else if (tipo == TipoProduto.BEBIDA) {
            ml = ((Bebida) produto).getMl();
        }
        return new ProdutoResponseDTO(
                produto.getId(),
                produto.getNome(),
                produto.getDescricao(),
                produto.getPreco(),
                produto.getkCal(),
                produto.getNomeImagem(),
                tipo,
                ml,
                tam,
                ingr,
                temp
        );
    }
}
