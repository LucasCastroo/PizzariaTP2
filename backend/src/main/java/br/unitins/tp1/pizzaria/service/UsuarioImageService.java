package br.unitins.tp1.pizzaria.service;

import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UsuarioImageService extends ImageService{

    public UsuarioImageService() {
        super("usuario");
    }
}
