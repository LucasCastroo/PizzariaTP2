import {Component, OnInit} from '@angular/core';
import {MatAnchor, MatFabButton, MatIconAnchor, MatIconButton} from "@angular/material/button";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {NavigationEnd, Router, RouterOutlet} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {PizzaDialogComponent} from "../../../admin-view/pizza/pizza-dialog/pizza-dialog.component";
import {UsuarioDialogComponent} from "../../../admin-view/usuario/usuario-dialog/usuario-dialog.component";
import {
  FuncionarioDialogComponent
} from "../../../admin-view/funcionario/conta/funcionario-dialog/funcionario-dialog.component";
import {ClienteDialogComponent} from "../../../admin-view/cliente/conta/cliente-dialog/cliente-dialog.component";
import {CupomDialogComponent} from "../../../admin-view/cupom/cupom-dialog/cupom-dialog.component";
import {BebidaDialogComponent} from "../../../admin-view/bebida/bebida-dialog/bebida-dialog.component";
import {
  IngredienteDialogComponent
} from "../../../admin-view/ingrediente/ingrediente-dialog/ingrediente-dialog.component";
import {UsuarioService} from "../../../../services/usuario.service";
import {Usuario} from "../../../../models/usuario";
import {MatCell, MatCellDef} from "@angular/material/table";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgIf} from "@angular/common";

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
    MatIconAnchor,
    MatCell,
    MatCellDef,
    NgIf
  ],
  templateUrl: './toolbar-sidenav.component.html',
  styleUrl: './toolbar-sidenav.component.css'
})
export class ToolbarSidenavComponent{
  isPedidosRoute: boolean = false;
  usuarioLogado: Usuario | undefined;
  currentURL = this.router.url.replace(/^\//, '');
  title = this.transformTitle();

  constructor(private router: Router, public dialog: MatDialog, private service: UsuarioService, protected snackBar: MatSnackBar) {
    service.minhaConta().subscribe({
      next: usuario =>{
        this.usuarioLogado = usuario;
      },
      error: e => {
        this.usuarioLogado = undefined;
      }
    });
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiry");
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
    } else if (this.currentURL == 'pedidos') {
      this.title = 'Pedidos';
    }
    return this.title;
  }

  openDialogCreate() {
    if (this.currentURL == 'usuarios') {
      this.dialog.open(UsuarioDialogComponent, {
        height: '600px',
        width: '450px',
      })
    } else if (this.currentURL == 'contas-funcionario') {
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
    } else if (this.currentURL == 'pedidos'){
      this.showSnackBarBottomPosition('Ação indisponível!', '', 3000);
    }
  }

  showSnackBarBottomPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
