package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.IngredienteDTO;
import br.unitins.tp1.pizzaria.dto.IngredienteResponseDTO;
import br.unitins.tp1.pizzaria.model.Ingrediente;
import br.unitins.tp1.pizzaria.repository.IngredienteRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;

import java.util.List;

@ApplicationScoped
public class IngredienteServiceImpl implements IngredienteService{
    @Inject
    IngredienteRepository repository;

    @Override
    @Transactional
    public IngredienteResponseDTO insert(IngredienteDTO dto) {
        Ingrediente ingrediente = new Ingrediente();
        ingrediente.setNome(dto.nome());
        ingrediente.setCategoria(dto.categoria());
        ingrediente.setPreco(dto.preco());
        repository.persist(ingrediente);
        return IngredienteResponseDTO.valueOf(ingrediente);
    }

    @Override
    @Transactional
    public IngredienteResponseDTO update(Long id, IngredienteDTO dto) {
        Ingrediente ingrediente = repository.findById(id);
        if(dto.nome() != null) ingrediente.setNome(dto.nome());
        if(dto.categoria() != null) ingrediente.setCategoria(dto.categoria());
        if(dto.preco() != null) ingrediente.setPreco(dto.preco());
        repository.persistAndFlush(ingrediente);
        return IngredienteResponseDTO.valueOf(ingrediente);
    }

    @Override
    @Transactional
    public void delete(Long id) {
        if (!repository.deleteById(id)) {
            throw new NotFoundException();
        }
    }

    @Override
    public IngredienteResponseDTO findById(Long id) {
        return IngredienteResponseDTO.valueOf(repository.findById(id));
    }

    @Override
    public List<IngredienteResponseDTO> findAll(int page, int pageSize) {
        return repository.findAll().page(page, pageSize).stream().map(IngredienteResponseDTO::valueOf).toList();
    }

    @Override
    public Long count(){
        return repository.count();
    }
}
