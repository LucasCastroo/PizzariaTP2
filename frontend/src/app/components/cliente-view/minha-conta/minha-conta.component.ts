import {Component} from '@angular/core';
import {HeaderComponent} from "../../template/cliente/header/header.component";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {AsyncPipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {Usuario} from "../../../models/usuario";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioService} from "../../../services/usuario.service";
import {validarCPF} from "../../../utils/validators";
import {combineLatestWith, forkJoin, lastValueFrom, map, merge, Observable} from "rxjs";
import {Cliente} from "../../../models/cliente";
import {Endereco} from "../../../models/endereco";

@Component({
  selector: 'app-minha-conta',
  standalone: true,
  imports: [
    HeaderComponent,
    MatIcon,
    MatInputModule,
    NgOptimizedImage,
    MatFabButton,
    MatMiniFabButton,
    MatExpansionModule,
    MatButtonToggle,
    MatButton,
    MatIconButton,
    FormsModule,
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    AsyncPipe
  ],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css'
})
export class MinhaContaComponent {
  usuarioLogado: Usuario | undefined;
  form: Observable<FormGroup>;
  addresses: Endereco[] = [];
  protected readonly open = open;
  protected readonly DialogChangePasswordComponent = ChangePasswordDialogComponent;

  constructor(protected dialog: MatDialog, private fb: FormBuilder, private service: UsuarioService) {
    this.form = forkJoin([service.minhaConta(), service.getCliente()]).pipe(map(data => {
      let usuario: Usuario & Cliente = {...data.at(0), ...data.at(1)} as Usuario & Cliente;
      return fb.group({
        nome: [(usuario && usuario.nome) ? usuario.nome : '', [Validators.required]],
        cpf: [{value: (usuario && usuario.cpf) ? usuario.cpf : '', disabled: true}, [Validators.required, validarCPF]],
        email: [(usuario && usuario.email) ? usuario.email : '', [Validators.required, Validators.email]],
        nascimento: [(usuario && usuario.nascimento) ? usuario.nascimento : '', [Validators.required]],
        telefone: [(usuario && usuario.telefone) ? usuario.telefone : '', [Validators.required]],
        enderecos: [(usuario && usuario.enderecos) ? usuario.enderecos : ''],
      });
    }));
    this.form.subscribe({
      next: data => {
        let usuario = data.value as Usuario & Cliente;
        console.log(usuario)
        if(usuario.enderecos) this.addresses.push(...usuario.enderecos);
      }
    })
  }

  addAddress() {

  }

  removeAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  saveAddress(index: number) {
    // Logic to save address
    console.log('Saving address at index', index);
  }
}
