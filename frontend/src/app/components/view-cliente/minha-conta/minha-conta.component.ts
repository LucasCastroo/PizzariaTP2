import { Component } from '@angular/core';
import {HeaderComponent} from "../../template/cliente/header/header.component";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgOptimizedImage} from "@angular/common";
import {Usuario} from "../../../models/usuario";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggle} from "@angular/material/button-toggle";

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon,
    MatInputModule,
    NgOptimizedImage,
    MatFabButton,
    MatMiniFabButton,
    MatExpansionModule,
    MatButtonToggle,
    MatButton,
    MatIconButton
  ],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css'
})
export class MinhaContaComponent {
  usuarioLogado: Usuario | undefined;


}
