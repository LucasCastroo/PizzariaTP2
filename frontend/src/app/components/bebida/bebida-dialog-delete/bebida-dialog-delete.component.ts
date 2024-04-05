import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCellDef} from "@angular/material/table";
import {BebidaService} from "../../../services/bebida.service";


@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatCellDef],
  templateUrl: './bebida-dialog-delete.component.html',
  styleUrl: './bebida-dialog-delete.component.css'
})
export class BebidaDialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<BebidaDialogDeleteComponent>, private service: BebidaService, protected snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) protected data: string) {}

  delete(){
    this.service.delete(this.data).subscribe({
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
