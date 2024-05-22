import { Component } from '@angular/core';
import {ToolbarSidenavComponent} from "../toolbar-sidenav/toolbar-sidenav.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-admin-template',
  standalone: true,
  imports: [
    ToolbarSidenavComponent,
    RouterOutlet
  ],
  templateUrl: './admin-template.component.html',
  styleUrl: './admin-template.component.css'
})
export class AdminTemplateComponent {

}
