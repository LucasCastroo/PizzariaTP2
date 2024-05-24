import { Component } from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    RouterOutlet,
    MatMenuItem,
    MatMenu,
    MatButton,
    MatMenuTrigger,
    NgIf
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router) {}

  nomeClienteLogado: string = "Login/Cadastro";
  clienteLogado = false;

  loginAccount() {
    if (this.clienteLogado) {
      // Lógica para quando o cliente está logado e quer acessar a conta
    } else {
      this.router.navigateByUrl('/login').then();
      this.clienteLogado = true;
      this.nomeClienteLogado = "Nome do Cliente"; // Substituir com o nome real do cliente
    }
  }

  navigateToAccount() {
    // Lógica para navegar para a página de conta do usuário
    this.router.navigateByUrl('/conta').then();
  }

  logout() {
    // Lógica para logout
    this.clienteLogado = false;
    this.nomeClienteLogado = "Login/Cadastro";
    this.router.navigateByUrl('/home').then();
  }
}
