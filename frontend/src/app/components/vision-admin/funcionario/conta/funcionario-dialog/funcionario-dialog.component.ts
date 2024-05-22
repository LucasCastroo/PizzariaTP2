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
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FuncionarioService} from "../../../../../services/funcionario.service";
import {Funcionario} from "../../../../../models/funcionario";
import {NivelAcesso} from "../../../../../models/nivel-acesso";

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
  templateUrl: './funcionario-dialog.component.html',
  styleUrl: './funcionario-dialog.component.css'
})
export class FuncionarioDialogComponent {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: FuncionarioService,
              @Inject(MAT_DIALOG_DATA) data: Funcionario,
              protected dialogRef: MatDialogRef<FuncionarioDialogComponent>,
              protected snackBar: MatSnackBar) {

    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      idUsuario: [(data && data.usuario.id) ? data.usuario.id : ''],
      tipoAcesso: [(data && data.tipoAcesso) ? data.tipoAcesso : '', Validators.required]
    });
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
            this.showSnackBarBottomPosition('Erro ao Criar Colaborador!', '', 3000);
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
            this.showSnackBarBottomPosition('Erro ao Editar Colaborador!', '', 3000);
          }
        });
      }
    }
  }

  showSnackBarBottomPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  protected readonly NivelAcesso = NivelAcesso;
  protected readonly Object = Object;
}
