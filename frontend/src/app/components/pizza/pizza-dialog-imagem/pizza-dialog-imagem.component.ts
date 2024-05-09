import {Component, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-pizza-dialog-imagem',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    MatFabButton,
    MatButton,
    NgIf
  ],
  templateUrl: './pizza-dialog-imagem.component.html',
  styleUrl: './pizza-dialog-imagem.component.css'
})
export class PizzaDialogImagemComponent{

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }
}
