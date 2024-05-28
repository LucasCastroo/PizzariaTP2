import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {UsuarioService} from "../../../../services/usuario.service";
import {Usuario} from "../../../../models/usuario";
import {MatBadge} from "@angular/material/badge";

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
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
    MatBadge
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  usuarioLogado: Usuario | undefined;
  qtdItensCarrinho: number = 0;

  constructor(protected router: Router, private service: UsuarioService) {
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
    this.router.navigateByUrl('/login').then();
  }

  ngOnInit(): void {
    this.obterQtdItens();
  }

  obterQtdItens() {

  }
}
