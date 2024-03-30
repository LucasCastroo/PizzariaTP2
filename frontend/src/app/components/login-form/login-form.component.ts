import { Component } from '@angular/core';
import {MatCard, MatCardContent, MatCardModule} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput, MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [
    NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule
  ],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  formGroup: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.min(8)])
    }
  )

  constructor(private service: AuthService, private route: ActivatedRoute) {
  }

  login(){
    this.route.url.subscribe(params =>{
      this.service.login(this.formGroup.value, params[0].path == "login")
    })
  }
}
