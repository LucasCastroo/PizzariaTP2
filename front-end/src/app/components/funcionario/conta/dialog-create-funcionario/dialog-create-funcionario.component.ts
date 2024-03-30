import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatButtonModule} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatError, MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {Funcionario} from "../../../../models/funcionario";
import { FuncionarioService } from "../../../../services/funcionario.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";

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
    ReactiveFormsModule
  ],
  templateUrl: './dialog-create-funcionario.component.html',
  styleUrl: './dialog-create-funcionario.component.css'
})
export class DialogCreateFuncionarioComponent {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: FuncionarioService,
              @Inject(MAT_DIALOG_DATA) data: Funcionario,
              protected dialogRef: MatDialogRef<DialogCreateFuncionarioComponent>,
              protected snackBar: MatSnackBar) {

    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      nome: [(data && data.nome) ? data.nome : '', Validators.required],
      email: [(data && data.email) ? data.email : '', Validators.required],
      cpf: [(data && data.cpf) ? data.cpf : '', Validators.required],
      nascimento: [(data && data.nascimento) ? data.nascimento : '', Validators.required],
      tipoAcesso: [(data && data.tipoAcesso) ? data.tipoAcesso : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(){
    if(this.formGroup.valid){
      const funcionario = this.formGroup.value;
      if (funcionario.id ==null) {
        this.service.insert(funcionario).subscribe({
          next: (funcionarioCadastrado) => {
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            console.log('Erro ao Criar' + JSON.stringify(err));
            this.snackBar.open("Erro ao Criar");
          }
        });
      } else {
        this.service.update(funcionario).subscribe({
          next: (funcionarioAlterado) => {
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
}
