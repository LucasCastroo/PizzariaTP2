package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.*;
import jakarta.annotation.Nullable;
import jakarta.validation.constraints.NotBlank;

public class ItemResponseDTO {
    private final Long id;
    private final String nome;
    private final String descricao;
    private final Double preco;
    private final Integer kCal;
    private final String nomeImagem;
    private final TipoItem tipo;
    private final Integer ml;
    private final TamanhoPizza tamanhoPizza;
    private final String ingredientes;
    private final Integer tempoDePreparo;

    public ItemResponseDTO(Long id, String nome, String descricao, Double preco, Integer kCal, String nomeImagem, TipoItem tipo, Integer ml, TamanhoPizza tamanhoPizza, String ingredientes, Integer tempoDePreparo) {
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

    public TipoItem getTipo() {
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

    public static ItemResponseDTO valueOf(Item item){
        TipoItem tipo = item.getTipo();
        Integer ml = null;
        TamanhoPizza tam = null;
        String ingr = null;
        Integer temp = null;
        if(tipo == TipoItem.PIZZA){
            tam = ((Pizza) item).getTamanhoPizza();
            ingr = ((Pizza) item).getIngredientes();
            temp = ((Pizza) item).getTempoDePreparo();
        } else if (tipo == TipoItem.BEBIDA) {
            ml = ((Bebida) item).getMl();
        }
        return new ItemResponseDTO(
                item.getId(),
                item.getNome(),
                item.getDescricao(),
                item.getPreco(),
                item.getkCal(),
                item.getNomeImagem(),
                tipo,
                ml,
                tam,
                ingr,
                temp
        );
    }
}
