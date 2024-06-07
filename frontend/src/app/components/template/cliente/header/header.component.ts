import {Component} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {Router, RouterOutlet} from "@angular/router";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {AsyncPipe, NgIf, NgOptimizedImage} from "@angular/common";
import {UsuarioService} from "../../../../services/usuario.service";
import {Usuario} from "../../../../models/usuario";
import {MatBadge} from "@angular/material/badge";
import {SacolaService} from "../../../../services/sacola.service";

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
export class HeaderComponent{
  usuarioLogado: Usuario | undefined;
  qtdItensCarrinho: number = 0;

  constructor(protected router: Router, private service: UsuarioService, protected sacolaService: SacolaService) {
    this.qtdItensCarrinho = sacolaService.getQuant()
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

  isHomePage(): boolean {
    return this.router.url === '/home';
  }

  navigateToHomePage(): void {
    this.router.navigateByUrl('/home').then();
  }

  scrollToSection(section: string) {
    document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' });
  }

}
