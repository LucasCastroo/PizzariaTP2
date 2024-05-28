import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {RouterOutlet} from "@angular/router";
import {HomeComponent} from "../../../view-cliente/home/home.component";

@Component({
  selector: 'app-cliente-template',
  standalone: true,
  imports: [
    HeaderComponent,
    RouterOutlet,
    HomeComponent
  ],
  templateUrl: './cliente-template.component.html',
  styleUrl: './cliente-template.component.css'
})
export class ClienteTemplateComponent {

}
