import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCellDef} from "@angular/material/table";
import {UsuarioService} from "../../../services/usuario.service";
import {Usuario} from "../../../models/usuario";


@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [MatDialogModule, MatButton, MatCellDef],
  templateUrl: './usuario-dialog-delete.component.html',
  styleUrl: './usuario-dialog-delete.component.css'
})
export class UsuarioDialogDeleteComponent {
  constructor(public dialogRef: MatDialogRef<UsuarioDialogDeleteComponent>, private service: UsuarioService,
              protected snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) protected usuario: Usuario) {}

  delete(){
    this.service.delete(this.usuario).subscribe({
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
