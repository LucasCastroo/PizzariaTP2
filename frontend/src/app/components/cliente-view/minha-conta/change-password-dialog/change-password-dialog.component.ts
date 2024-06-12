import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatDialogRef} from "@angular/material/dialog";
import {MatIcon} from "@angular/material/icon";
import {UsuarioService} from "../../../../services/usuario.service";

@Component({
  selector: 'app-dialog-change-password',
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
    MatIcon
  ],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {
  form = this.fb.group({
    antigaSenha: ["", [Validators.required, Validators.minLength(8)]],
    novaSenha: ["", [Validators.required, Validators.minLength(8)]],
  })
  constructor(protected dialogRef: MatDialogRef<ChangePasswordDialogComponent>, private service: UsuarioService, private fb: FormBuilder) {

  }

  save() {
    this.service.alterarSenha(this.form.value as {antigaSenha: string | null, novaSenha: string | null}).subscribe({
      next: result => {
        this.dialogRef.close();
      }
    })
  }
}
