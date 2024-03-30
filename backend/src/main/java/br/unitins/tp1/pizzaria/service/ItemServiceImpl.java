package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.ItemDTO;
import br.unitins.tp1.pizzaria.dto.ItemResponseDTO;
import br.unitins.tp1.pizzaria.model.Bebida;
import br.unitins.tp1.pizzaria.model.Item;
import br.unitins.tp1.pizzaria.model.Pizza;
import br.unitins.tp1.pizzaria.model.TipoItem;
import br.unitins.tp1.pizzaria.repository.ItemRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;

@ApplicationScoped
public class ItemServiceImpl implements ItemService{

    @Inject
    ItemRepository repository;

    @Override
    @Transactional
    public ItemResponseDTO create(ItemDTO dto) {
        if(dto.tipo == TipoItem.PIZZA){
            Pizza pizza = new Pizza();
            pizza.setTamanhoPizza(dto.getTamanhoPizza());
            pizza.setIngredientes(dto.getIngredientes());
            pizza.setNome(dto.getNome());
            pizza.setDescricao(dto.getDescricao());
            pizza.setkCal(dto.getkCal());
            pizza.setTempoDePreparo(dto.getTempoDePreparo());
            pizza.setPreco(dto.getPreco());

            repository.persist(pizza);

            return ItemResponseDTO.valueOf(pizza);

        } else if (dto.tipo == TipoItem.BEBIDA) {
            Bebida bebida = new Bebida();
            bebida.setNome(dto.getNome());
            bebida.setDescricao(dto.getDescricao());
            bebida.setkCal(dto.getkCal());
            bebida.setMl(dto.getMl());
            bebida.setPreco(dto.getPreco());

            repository.persist(bebida);

            return ItemResponseDTO.valueOf(bebida);
        }
        throw new RuntimeException("Tipo de item desconhecido");
    }

    @Override
    @Transactional
    public ItemResponseDTO update(Long id, ItemDTO dto) {
        Item item = repository.findById(id);
        if (dto.getDescricao() != null) item.setDescricao(dto.getDescricao());
        if (dto.getkCal() != null) item.setkCal(dto.getkCal());
        if (dto.getNome() != null) item.setNome(dto.getNome());
        if (dto.getPreco() != null) item.setPreco(dto.getPreco());
        if(dto.tipo == TipoItem.PIZZA){
            if (dto.getIngredientes() != null) ((Pizza) item).setIngredientes(dto.getIngredientes());
            if (dto.getTamanhoPizza() != null) ((Pizza) item).setTamanhoPizza(dto.getTamanhoPizza());
            if (dto.getTempoDePreparo() != null) ((Pizza) item).setTempoDePreparo(dto.getTempoDePreparo());
        }else if(dto.tipo == TipoItem.BEBIDA) {
            if (dto.getMl() != null) ((Bebida) item).setMl(dto.getMl());
        }else{
            throw new RuntimeException("Tipo de item desconhecido");
        }
        repository.persistAndFlush(item);
        return ItemResponseDTO.valueOf(item);
    }

    @Override
    @Transactional
    public ItemResponseDTO updateImage(Long id, String nomeImagem) {
        Item item = repository.findById(id);
        item.setNomeImagem(nomeImagem);
        repository.persistAndFlush(item);
        return ItemResponseDTO.valueOf(item);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        repository.deleteById(id);
    }

    @Override
    public ItemResponseDTO findById(Long id) {
        return ItemResponseDTO.valueOf(repository.findById(id));
    }

    @Override
    public List<ItemResponseDTO> findAll() {
        return repository.findAll().stream().map(ItemResponseDTO::valueOf).toList();
    }
}
