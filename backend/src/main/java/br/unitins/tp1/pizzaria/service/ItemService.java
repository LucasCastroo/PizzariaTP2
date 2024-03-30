package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.ItemDTO;
import br.unitins.tp1.pizzaria.dto.ItemResponseDTO;

import java.util.List;

public interface ItemService {

    ItemResponseDTO create(ItemDTO dto);

    ItemResponseDTO update(Long id, ItemDTO dto);

    ItemResponseDTO updateImage(Long id, String nomeImagem);

    void delete(Long id);

    ItemResponseDTO findById(Long id);

    List<ItemResponseDTO> findAll();

}
