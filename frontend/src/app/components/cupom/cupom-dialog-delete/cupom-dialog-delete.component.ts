import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {CupomService} from "../../../services/cupom.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCellDef} from "@angular/material/table";


@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatCellDef],
  templateUrl: './cupom-dialog-delete.component.html',
  styleUrl: './cupom-dialog-delete.component.css'
})
export class CupomDialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<CupomDialogDeleteComponent>, private service: CupomService, protected snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) protected data: string) {}

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
