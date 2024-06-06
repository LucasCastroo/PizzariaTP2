import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../../../cliente-view/home/home.component";
import {CardapioComponent} from "../../../cliente-view/cardapio/cardapio.component";

@Component({
  selector: 'app-cliente-template',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    HomeComponent,
    CardapioComponent
  ],
  templateUrl: './cliente-template.component.html',
  styleUrl: './cliente-template.component.css'
})
export class ClienteTemplateComponent {

}
