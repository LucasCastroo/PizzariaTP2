import {Component} from '@angular/core';
import {MatAnchor, MatFabButton, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {PizzaDialogComponent} from "../../pizza/pizza-dialog/pizza-dialog.component";
import {Router, RouterOutlet} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioDialogComponent} from "../../usuario/usuario-dialog/usuario-dialog.component";
import {FuncionarioDialogComponent} from "../../funcionario/conta/funcionario-dialog/funcionario-dialog.component";
import {CupomDialogComponent} from "../../cupom/cupom-dialog/cupom-dialog.component";
import {BebidaDialogComponent} from "../../bebida/bebida-dialog/bebida-dialog.component";
import {IngredienteDialogComponent} from "../../ingrediente/ingrediente-dialog/ingrediente-dialog.component";
import {ClienteDialogComponent} from "../../cliente/conta/cliente-dialog/cliente-dialog.component";

@Component({
  selector: 'app-toolbar-sidenav',
  standalone: true,
  imports: [
    MatAnchor,
    MatDrawer,
    MatDrawerContainer,
    MatFabButton,
    MatIcon,
    MatIconButton,
    MatToolbar,
    RouterOutlet,
    MatIconAnchor
  ],
  templateUrl: './toolbar-sidenav.component.html',
  styleUrl: './toolbar-sidenav.component.css'
})
export class ToolbarSidenavComponent{
  usuarioLogado = 'Usuário Logado';
  currentURL = this.router.url.replace(/^\//, '');
  title = this.transformTitle();
  constructor(private router: Router, public dialog: MatDialog) {
  }

  logout() {
    this.router.navigateByUrl('/login-admin').then();
  }
  transformTitle(): string {
    if (this.currentURL == 'usuarios') {
      this.title = 'Usuários';
    } else if (this.currentURL == 'contas-cliente') {
      this.title = 'Clientes';
    } else if (this.currentURL == 'contas-funcionario') {
      this.title = 'Colaboradores';
    } else if (this.currentURL == 'cupons') {
      this.title = 'Cupons';
    } else if (this.currentURL == 'pizzas') {
      this.title = 'Pizzas';
    } else if (this.currentURL == 'bebidas') {
      this.title = 'Bebidas';
    } else if (this.currentURL == 'ingredientes') {
      this.title = 'Ingredientes';
    }
    return this.title;
  }

  openDialogCreate() {
    if (this.currentURL == 'usuarios') {
      this.dialog.open(UsuarioDialogComponent, {
        height: '600px',
        width: '450px',
      })
    } else if (this.currentURL == 'contas-fucionario') {
      this.dialog.open(FuncionarioDialogComponent, {
        height: '380px',
        width: '400px',
      })
    } else if (this.currentURL == 'contas-cliente') {
      this.dialog.open(ClienteDialogComponent, {
        height: '380px',
        width: '400px',
      })
    } else if (this.currentURL == 'cupons') {
      this.dialog.open(CupomDialogComponent, {
        width: '350px'})
    } else if (this.currentURL == 'pizzas') {
      this.dialog.open(PizzaDialogComponent, {
        width: '450px',
        height: '500px'
      })
    } else if (this.currentURL == 'bebidas') {
      this.dialog.open(BebidaDialogComponent, {
        width: '350px'})
    } else if (this.currentURL == 'ingredientes'){
      this.dialog.open(IngredienteDialogComponent, {
        width: '350px'})
    }
  }
}
