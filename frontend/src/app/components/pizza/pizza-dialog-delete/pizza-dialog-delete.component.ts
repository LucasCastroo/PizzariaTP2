import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCellDef} from "@angular/material/table";
import {PizzaService} from "../../../services/pizza.service";
import {Pizza} from "../../../models/pizza";


@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatCellDef],
  templateUrl: './pizza-dialog-delete.component.html',
  styleUrl: './pizza-dialog-delete.component.css'
})
export class PizzaDialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<PizzaDialogDeleteComponent>, private service: PizzaService,
              protected snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) protected pizza: Pizza) {}

  delete(){
    this.service.delete(this.pizza.id).subscribe({
      next: () =>{
        window.location.reload();
      },
      error: (err) =>{
        console.log('Erro ao Deletar' + JSON.stringify(err));
        this.snackBar.open("Erro ao Deletar");
      }
    })
  }
}
