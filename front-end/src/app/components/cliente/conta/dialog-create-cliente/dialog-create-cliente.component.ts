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
import {Cliente} from "../../../../models/cliente";
import {ClienteService} from "../../../../services/cliente.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCard, MatCardActions, MatCardContent, MatCardModule} from "@angular/material/card";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-dialog-create-cliente',
  standalone: true,
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
    ReactiveFormsModule
  ],
  templateUrl: './dialog-create-cliente.component.html',
  styleUrl: './dialog-create-cliente.component.css'
})
export class DialogCreateClienteComponent {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: ClienteService,
              @Inject(MAT_DIALOG_DATA) data: Cliente,
              protected dialogRef: MatDialogRef<DialogCreateClienteComponent>,
              protected snackBar: MatSnackBar) {

    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      nome: [(data && data.nome) ? data.nome : '', Validators.required],
      email: [(data && data.email) ? data.email : '', Validators.required],
      nascimento: [(data && data.nascimento) ? data.nascimento : '', Validators.required],
      telefone: [(data && data.telefone) ? data.telefone : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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
