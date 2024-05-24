package br.unitins.tp1.pizzaria.service;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class ProdutoImageService extends ImageService{
    public ProdutoImageService() {
        super("produto");
    }
}
