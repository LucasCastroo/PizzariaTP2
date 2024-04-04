package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.ProdutoDTO;
import br.unitins.tp1.pizzaria.dto.ProdutoResponseDTO;
import br.unitins.tp1.pizzaria.model.Bebida;
import br.unitins.tp1.pizzaria.model.Produto;
import br.unitins.tp1.pizzaria.model.Pizza;
import br.unitins.tp1.pizzaria.model.TipoProduto;
import br.unitins.tp1.pizzaria.repository.ProdutoRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ProdutoServiceImpl implements ProdutoService {

    @Inject
    ProdutoRepository repository;

    @Override
    @Transactional
    public ProdutoResponseDTO create(ProdutoDTO dto) {
        if(dto.tipo == TipoProduto.PIZZA){
            Pizza pizza = new Pizza();
            pizza.setTamanhoPizza(dto.getTamanhoPizza());
            pizza.setIngredientes(dto.getIngredientes());
            pizza.setNome(dto.getNome());
            pizza.setDescricao(dto.getDescricao());
            pizza.setkCal(dto.getkCal());
            pizza.setTempoDePreparo(dto.getTempoDePreparo());
            pizza.setPreco(dto.getPreco());

            repository.persist(pizza);

            return ProdutoResponseDTO.valueOf(pizza);

        } else if (dto.tipo == TipoProduto.BEBIDA) {
            Bebida bebida = new Bebida();
            bebida.setNome(dto.getNome());
            bebida.setDescricao(dto.getDescricao());
            bebida.setkCal(dto.getkCal());
            bebida.setMl(dto.getMl());
            bebida.setPreco(dto.getPreco());

            repository.persist(bebida);

            return ProdutoResponseDTO.valueOf(bebida);
        }
        throw new RuntimeException("Tipo de item desconhecido");
    }

    @Override
    @Transactional
    public ProdutoResponseDTO update(Long id, ProdutoDTO dto) {
        Produto produto = repository.findById(id);
        if (dto.getDescricao() != null) produto.setDescricao(dto.getDescricao());
        if (dto.getkCal() != null) produto.setkCal(dto.getkCal());
        if (dto.getNome() != null) produto.setNome(dto.getNome());
        if (dto.getPreco() != null) produto.setPreco(dto.getPreco());
        if(dto.tipo == TipoProduto.PIZZA){
            if (dto.getIngredientes() != null) ((Pizza) produto).setIngredientes(dto.getIngredientes());
            if (dto.getTamanhoPizza() != null) ((Pizza) produto).setTamanhoPizza(dto.getTamanhoPizza());
            if (dto.getTempoDePreparo() != null) ((Pizza) produto).setTempoDePreparo(dto.getTempoDePreparo());
        }else if(dto.tipo == TipoProduto.BEBIDA) {
            if (dto.getMl() != null) ((Bebida) produto).setMl(dto.getMl());
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
    public List<ProdutoResponseDTO> findAll() {
        return repository.findAll().stream().map(ProdutoResponseDTO::valueOf).toList();
    }
}
