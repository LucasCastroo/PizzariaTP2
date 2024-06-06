import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../../../cliente-view/home/home.component";
import {CardapioComponent} from "../../../cliente-view/cardapio/cardapio.component";
import {SobreComponent} from "../../../cliente-view/sobre/sobre.component";
import {FooterComponent} from "../footer/footer.component";

@Component({
  selector: 'app-cliente-template',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    HomeComponent,
    CardapioComponent,
    SobreComponent,
    FooterComponent
  ],
  templateUrl: './cliente-template.component.html',
  styleUrl: './cliente-template.component.css'
})
export class ClienteTemplateComponent {

}
