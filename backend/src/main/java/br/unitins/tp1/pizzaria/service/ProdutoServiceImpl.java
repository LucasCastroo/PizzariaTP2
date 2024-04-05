package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.ProdutoDTO;
import br.unitins.tp1.pizzaria.dto.ProdutoResponseDTO;
import br.unitins.tp1.pizzaria.model.*;
import br.unitins.tp1.pizzaria.repository.BebidaRepository;
import br.unitins.tp1.pizzaria.repository.IngredienteRepository;
import br.unitins.tp1.pizzaria.repository.PizzaRepository;
import br.unitins.tp1.pizzaria.repository.ProdutoRepository;
import io.quarkus.hibernate.orm.panache.PanacheQuery;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class ProdutoServiceImpl implements ProdutoService {

    @Inject
    ProdutoRepository repository;
    @Inject
    IngredienteRepository ingredienteRepository;
    @Inject
    PizzaRepository pizzaRepository;
    @Inject
    BebidaRepository bebidaRepository;

    @Override
    @Transactional
    public ProdutoResponseDTO create(ProdutoDTO dto) {
        if(dto.tipo() == TipoProduto.PIZZA){
            Pizza pizza = new Pizza();
            pizza.setTamanhoPizza(dto.tamanhoPizza());
            pizza.setNome(dto.nome());
            pizza.setDescricao(dto.descricao());
            pizza.setkCal(dto.kCal());
            pizza.setPreco(dto.preco());
            pizza.setPizzaPronta(dto.pizzaPronta());
            pizza.setQuantPorcoes(dto.quantPorcoes());
            Set<PorcaoPizza> porcoes = new HashSet<>();
            dto.porcoes().forEach(porcaoDTO -> {
                PorcaoPizza porcao = new PorcaoPizza();
                Set<Ingrediente> ingredientes = new HashSet<>();
                porcaoDTO.idIngredientes().forEach(id ->{
                    Ingrediente ingrediente = ingredienteRepository.findById(id);
                    if(ingrediente != null) ingredientes.add(ingrediente);
                });
                porcao.setIngredientes(ingredientes);
                porcoes.add(porcao);
            });
            pizza.setPorcoes(porcoes);
            repository.persist(pizza);

            return ProdutoResponseDTO.valueOf(pizza);

        } else if (dto.tipo() == TipoProduto.BEBIDA) {
            Bebida bebida = new Bebida();
            bebida.setNome(dto.nome());
            bebida.setDescricao(dto.descricao());
            bebida.setkCal(dto.kCal());
            bebida.setMl(dto.ml());
            bebida.setPreco(dto.preco());

            repository.persist(bebida);

            return ProdutoResponseDTO.valueOf(bebida);
        }
        throw new RuntimeException("Tipo de item desconhecido");
    }

    @Override
    @Transactional
    public ProdutoResponseDTO update(Long id, ProdutoDTO dto) {
        Produto produto = repository.findById(id);
        if (dto.descricao() != null) produto.setDescricao(dto.descricao());
        if (dto.kCal() != null) produto.setkCal(dto.kCal());
        if (dto.nome() != null) produto.setNome(dto.nome());
        if (dto.preco() != null) produto.setPreco(dto.preco());
        if(dto.tipo() == TipoProduto.PIZZA){
            if (dto.tamanhoPizza() != null) ((Pizza) produto).setTamanhoPizza(dto.tamanhoPizza());
        }else if(dto.tipo() == TipoProduto.BEBIDA) {
            if (dto.ml() != null) ((Bebida) produto).setMl(dto.ml());
        }else{
            throw new RuntimeException("Tipo de item desconhecido");
        }
        repository.persistAndFlush(produto);
        return ProdutoResponseDTO.valueOf(produto);
    }

    @Override
    @Transactional
    public ProdutoResponseDTO updateImage(Long id, String nomeImagem) {
        Produto produto = repository.findById(id);
        produto.setNomeImagem(nomeImagem);
        repository.persistAndFlush(produto);
        return ProdutoResponseDTO.valueOf(produto);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ProdutoResponseDTO findById(Long id) {
        return ProdutoResponseDTO.valueOf(repository.findById(id));
    }

    @Override
    @Transactional // não funciona sem isso, não me pergunte o porquê
    public List<ProdutoResponseDTO> findAll(int page, int pageSize, String tipo) {
        PanacheQuery<? extends Produto> query = switch (tipo){
            case "PIZZA" -> pizzaRepository.findAll();
            case "BEBIDA" -> bebidaRepository.findAll();
            default -> repository.findAll();
        };
        return query.page(page, pageSize).stream().map(ProdutoResponseDTO::valueOf).toList();
    }

    @Override
    public Long count(TipoProduto tipo) {
        return switch (tipo){
            case PIZZA -> pizzaRepository.count();
            case BEBIDA -> bebidaRepository.count();
        };
    }


}
