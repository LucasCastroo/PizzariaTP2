package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.ProdutoDTO;
import br.unitins.tp1.pizzaria.dto.ProdutoResponseDTO;

import java.util.List;

public interface ProdutoService {

    ProdutoResponseDTO create(ProdutoDTO dto);

    ProdutoResponseDTO update(Long id, ProdutoDTO dto);

    ProdutoResponseDTO updateImage(Long id, String nomeImagem);

    void delete(Long id);

    ProdutoResponseDTO findById(Long id);

    List<ProdutoResponseDTO> findAll();

}
