package br.unitins.tp1.pizzaria.model;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Funcionario extends BaseEntity{
    public static final String ROLE = "FUNCIONARIO";

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_usuario", referencedColumnName = "id")
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private NivelAcesso tipoAcesso;

    public Funcionario(Usuario usuario, NivelAcesso tipoAcesso) {
        this.tipoAcesso = tipoAcesso;
    }

    public Funcionario() {

    }

    public NivelAcesso getTipoAcesso() {
        return tipoAcesso;
    }

    public void setTipoAcesso(NivelAcesso tipoAcesso) {
        this.tipoAcesso = tipoAcesso;
    }

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }
}
