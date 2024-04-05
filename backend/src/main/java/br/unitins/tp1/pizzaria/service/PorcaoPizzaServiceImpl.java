package br.unitins.tp1.pizzaria.service;

import br.unitins.tp1.pizzaria.dto.PorcaoPizzaDTO;
import br.unitins.tp1.pizzaria.dto.PorcaoPizzaResponseDTO;
import br.unitins.tp1.pizzaria.model.Ingrediente;
import br.unitins.tp1.pizzaria.model.PorcaoPizza;
import br.unitins.tp1.pizzaria.repository.IngredienteRepository;
import br.unitins.tp1.pizzaria.repository.PorcaoPizzaRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

@ApplicationScoped
public class PorcaoPizzaServiceImpl implements PorcaoPizzaService{
    @Inject
    PorcaoPizzaRepository repository;

    @Inject
    IngredienteRepository ingredienteRepository;

    @Override
    public PorcaoPizzaResponseDTO findById(Long id) {
        return PorcaoPizzaResponseDTO.valueOf(repository.findById(id));
    }

    @Override
    @Transactional
    public PorcaoPizzaResponseDTO addIngrediente(Long id, Long ingredienteId) {
        PorcaoPizza porcao = repository.findById(id);
        Ingrediente ingrediente = ingredienteRepository.findById(ingredienteId);
        porcao.getIngredientes().add(ingrediente);
        repository.persistAndFlush(porcao);
        return PorcaoPizzaResponseDTO.valueOf(porcao);
    }

    @Override
    @Transactional
    public PorcaoPizzaResponseDTO removeIngrediente(Long id, Long ingredienteId) {
        PorcaoPizza porcao = repository.findById(id);
        porcao.getIngredientes().removeIf(igr -> Objects.equals(igr.getId(), ingredienteId));
        repository.persistAndFlush(porcao);
        return PorcaoPizzaResponseDTO.valueOf(porcao);
    }

    @Override
    @Transactional
    public boolean delete(Long id) {
        return repository.deleteById(id);
    }

    @Override
    @Transactional
    public PorcaoPizzaResponseDTO create(PorcaoPizzaDTO dto) {
        PorcaoPizza porcao = new PorcaoPizza();
        Set<Ingrediente> ingredientes = dto.idIngredientes().stream().map(id -> ingredienteRepository.findById(id)).collect(Collectors.toSet());
        porcao.setIngredientes(ingredientes);
        repository.persistAndFlush(porcao);
        return PorcaoPizzaResponseDTO.valueOf(porcao);
    }
}
