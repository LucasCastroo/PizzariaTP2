import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar} from "@angular/material/snack-bar";
import {catchError} from "rxjs";
import {error} from "@angular/compiler-cli/src/transformers/util";

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
  durationSnackbar = 3;
  hide = true;
  formGroup: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.min(8)])
    }
  )

  constructor(private service: AuthService, private route: ActivatedRoute, private router: Router, private _snackBar: MatSnackBar) {
  }

  login(){
    if (this.formGroup.valid) {
      this.route.url.subscribe(params => {
        this.service.loginFuncionario(this.formGroup.value);
      });
    } else {
      this.openSnackBar();
    }
  }

  openSnackBar() {
    this._snackBar.open('Erro ao efetuar login', '', {
      duration: this.durationSnackbar * 1000
    });
  }
}
