import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from "@angular/material/dialog";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from "@angular/material/card";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {UsuarioService} from "../../../../services/usuario.service";
import {Usuario} from "../../../../models/usuario";

@Component({
  selector: 'app-dialog-create',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatSelectModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ],
  templateUrl: './usuario-dialog.component.html',
  styleUrl: './usuario-dialog.component.css'
})
export class UsuarioDialogComponent {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: UsuarioService,
              @Inject(MAT_DIALOG_DATA) data: Usuario,
              protected dialogRef: MatDialogRef<UsuarioDialogComponent>,
              protected snackBar: MatSnackBar) {

    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      nome: [(data && data.nome) ? data.nome : '', Validators.required],
      email: [(data && data.email) ? data.email : '', Validators.required],
      cpf: [(data && data.cpf) ? data.cpf : '', Validators.required],
      senha: [(data && data.senha) ? data.senha: '', Validators.required],
      nascimento: [(data && data.nascimento) ? data.nascimento : '', Validators.required]
    });
  }

  save(){
    if(this.formGroup.valid){
      const usuario = this.formGroup.value;
      if (usuario.id ==null) {
        this.service.insert(usuario).subscribe({
          next: (usuarioCadastrado) => {
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            console.log('Erro ao Criar' + JSON.stringify(err));
            this.snackBar.open("Erro ao Criar");
          }
        });
      } else {
        this.service.update(usuario).subscribe({
          next: (usuarioAlterado) => {
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
            this.snackBar.open("Erro ao Editar");
          }
        });
      }
    }
  }
  protected readonly Object = Object;
}
