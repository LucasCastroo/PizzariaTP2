import { Component, AfterViewInit, ElementRef } from '@angular/core';
import {MatError, MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../../../services/auth.service";
import {ActivatedRoute} from "@angular/router";
import {UsuarioService} from "../../../services/usuario.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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

  formGroupLogin: FormGroup = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required, Validators.min(8)])
    }
  )

  formGroupCadastro: FormGroup = new FormGroup(
    {
      nome: new FormControl('', [Validators.required]),
      cpf: new FormControl('', [Validators.required]),
      dataNascimento: new FormControl('', [Validators.required]),
      emailCadastro: new FormControl('', [Validators.required, Validators.email]),
      senhaCadastro: new FormControl('', [Validators.required, Validators.min(8)])
    }
  )
  constructor(private elementRef: ElementRef,
              private service: AuthService,
              private route: ActivatedRoute,
              private serviceUsuario: UsuarioService,
              protected snackBar: MatSnackBar) {

  }

  ngAfterViewInit() {
    const container = this.elementRef.nativeElement.querySelector('.container');
    const cadastreSeBtn = this.elementRef.nativeElement.querySelector('#cadastrar');
    const loginBtn = this.elementRef.nativeElement.querySelector('#login');

    if (container && cadastreSeBtn && loginBtn) {
      cadastreSeBtn.addEventListener('click', () => {
        container.classList.add("active");
      });

      loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
      });
    }
  }

  login() {
    if (this.formGroupLogin.valid) {
      this.route.url.subscribe(params => {
        this.service.loginCliente(this.formGroupLogin.value).catch(error => {
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


  cadastrar(){
    if(this.formGroupCadastro.valid){
      const usuario = this.formGroupCadastro.value;
        this.serviceUsuario.insert(usuario).subscribe({
          next: (usuarioCadastrado) => {
            window.location.reload();
          },
          error: (err) => {
            console.log('Erro ao Cadastrar' + JSON.stringify(err));
            this.showSnackBarBottomPosition('Preencha todos os campos corretamente!', '', 3000);
          }
        });
    }
  }

  showSnackBarBottomPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
