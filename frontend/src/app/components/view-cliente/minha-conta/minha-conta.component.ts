import { Component } from '@angular/core';
import {HeaderComponent} from "../../template/cliente/header/header.component";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon,
    MatInputModule
  ],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css'
})
export class MinhaContaComponent {

}
