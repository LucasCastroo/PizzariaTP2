import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../services/auth.service";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule,
    MatIconModule
  ],
  templateUrl: './login-admin.component.html',
  styleUrl: './login-admin.component.css'
})
export class LoginAdminComponent {
  hide = true;
  formGroup: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.min(8)])
    }
  )

  constructor(private service: AuthService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {
  }

  login() {
    if (this.formGroup.valid) {
      this.route.url.subscribe(params => {
        this.service.loginFuncionario(this.formGroup.value).catch(error => {
          if (error.message === 'Internal Server Error' || error.message === 'Bad Request') {
            this.showSnackBarBottomPosition('Email ou senha incorreto!', '', 3000);
          } else {
            console.log(error);
          }
        });
      });
    } else {
      this.showSnackBarBottomPosition('Coloque um e-mail e senha válido!', '', 3000);
    }
  }

  showSnackBarBottomPosition(content: any, action: any, duration: any) {
    this._snackBar.open(content, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
