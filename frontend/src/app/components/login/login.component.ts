import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import {MatError, MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatInput,
    MatError,
    NgIf,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements AfterViewInit{

  formGroup: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.min(8)])
    }
  )
  constructor(private elementRef: ElementRef, private service: AuthService, private route: ActivatedRoute,) {}

  ngAfterViewInit() {
    const container = this.elementRef.nativeElement.querySelector('.container');
    const cadastrarBtn = this.elementRef.nativeElement.querySelector('#cadastrar');
    const loginBtn = this.elementRef.nativeElement.querySelector('#login');

    if (container && cadastrarBtn && loginBtn) {
      cadastrarBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }
  }

  login(){
    this.route.url.subscribe(params =>{
      this.service.loginCliente(this.formGroup.value)
    })
  }
}
