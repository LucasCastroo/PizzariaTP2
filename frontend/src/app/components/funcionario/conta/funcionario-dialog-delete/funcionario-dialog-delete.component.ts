import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCellDef} from "@angular/material/table";
import {FuncionarioService} from "../../../../services/funcionario.service";
import {Funcionario} from "../../../../models/funcionario";


@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatCellDef],
  templateUrl: './funcionario-dialog-delete.component.html',
  styleUrl: './funcionario-dialog-delete.component.css'
})
export class FuncionarioDialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<FuncionarioDialogDeleteComponent>, private service: FuncionarioService,
              protected snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) protected funcionario: Funcionario) {}

  delete(){
    this.service.delete(this.funcionario).subscribe({
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
