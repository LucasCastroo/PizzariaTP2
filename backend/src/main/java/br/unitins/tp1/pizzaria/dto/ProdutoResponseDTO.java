package br.unitins.tp1.pizzaria.dto;

import br.unitins.tp1.pizzaria.model.*;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

public record ProdutoResponseDTO(Long id, String nome, String descricao, Double preco, Integer kCal, String nomeImagem,
                                 TipoProduto tipo, Integer ml, TamanhoPizza tamanhoPizza, Integer quantPorcoes,
                                 Set<PorcaoPizzaResponseDTO> porcoes,
                                 Boolean pizzaPronta) {

    public static ProdutoResponseDTO valueOf(Produto produto) {
        TipoProduto tipo = produto.getTipo();
        Integer ml = null;
        TamanhoPizza tam = null;
        Integer quantPorcoes = null;
        Set<PorcaoPizza> porc = new HashSet<>();
        Boolean pizzaPronta = null;
        if (tipo == TipoProduto.PIZZA) {
            tam = ((Pizza) produto).getTamanhoPizza();
            porc = ((Pizza) produto).getPorcoes();
            quantPorcoes = ((Pizza) produto).getQuantPorcoes();
            pizzaPronta = ((Pizza) produto).getPizzaPronta();
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
                quantPorcoes,
                porc.stream().map(PorcaoPizzaResponseDTO::valueOf).collect(Collectors.toSet()),
                pizzaPronta
        );
    }
}
