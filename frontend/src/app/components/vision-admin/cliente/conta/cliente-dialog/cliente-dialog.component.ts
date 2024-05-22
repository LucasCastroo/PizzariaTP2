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
import {MatFormField, MatFormFieldModule, MatLabel} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from "@angular/material/card";
import {NgIf, NgOptimizedImage} from "@angular/common";
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, provideNativeDateAdapter} from "@angular/material/core";
import {ClienteService} from "../../../../../services/cliente.service";
import {Cliente} from "../../../../../models/cliente";

@Component({
  selector: 'app-dialog-create-cliente',
  standalone: true,
  providers: [provideNativeDateAdapter(), {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'}],
  imports: [
    NgIf, MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatButton,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormField,
    MatInput,
    MatLabel,
    MatDialogClose,
    MatCardActions,
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    NgOptimizedImage,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './cliente-dialog.component.html',
  styleUrl: './cliente-dialog.component.css'
})
export class ClienteDialogComponent {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: ClienteService,
              @Inject(MAT_DIALOG_DATA) data: Cliente,
              protected dialogRef: MatDialogRef<ClienteDialogComponent>,
              protected snackBar: MatSnackBar) {

    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.usuario.id : null],
      idUsuario: [(data && data.usuario.id) ? data.usuario.id : '', Validators.required],
      telefone: [(data && data.telefone) ? data.telefone : '', Validators.required]
    });
  }

  save(){
    if(this.formGroup.valid){
      const cliente = this.formGroup.value;
      if (cliente.id ==null) {
        this.service.insert(cliente).subscribe({
          next: (clienteCadastrado) => {
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            console.log('Erro ao Criar' + JSON.stringify(err));
            this.snackBar.open("Erro ao Criar");
          }
        });
      } else {
        this.service.update(cliente).subscribe({
          next: (clienteAlterado) => {
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
