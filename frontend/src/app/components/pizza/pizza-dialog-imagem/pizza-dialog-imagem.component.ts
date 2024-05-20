import {Component, Inject, OnInit} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PizzaService} from "../../../services/pizza.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Pizza} from "../../../models/pizza";

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
  file: File | undefined;

  constructor(public dialogRef: MatDialogRef<PizzaDialogImagemComponent>, private service: PizzaService,
              protected snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) protected id: number) {
  }

  onChange(file: File){
    this.file = file
  }

  salvarImagem() {
    if(this.file !== undefined){
      this.service.uploadImage(this.file, this.id).subscribe({
        next: (r) => {
          this.snackBar.open("Imagem atualizada com sucesso!");
          this.dialogRef.close();
        },
        error: (e) =>{
          this.snackBar.open("Erro ao atualizar imagem", e);
        }
      })

    }
  }
}
