import { Component } from '@angular/core';
import {HeaderComponent} from "../../template/cliente/header/header.component";
import {MatIcon} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {Usuario} from "../../../models/usuario";
import {MatButton, MatFabButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatButtonToggle} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {ChangePasswordDialogComponent} from "./change-password-dialog/change-password-dialog.component";
import {MatDialog} from "@angular/material/dialog";

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
    NgForOf
  ],
  templateUrl: './minha-conta.component.html',
  styleUrl: './minha-conta.component.css'
})
export class MinhaContaComponent {
  usuarioLogado: Usuario | undefined;

  constructor(protected dialog: MatDialog) {
  }

  addresses: any[] = [
    {
      alias: 'Apelido do Endereço',
      description: 'Breve descrição do endereço',
      rua: '',
      numero: '',
      cep: '',
      bairro: '',
      complemento: ''
    }
  ];

  addAddress() {
    this.addresses.push({
      alias: 'Novo endereço',
      description: '',
      rua: '',
      numero: '',
      cep: '',
      bairro: '',
      complemento: ''
    });
  }

  removeAddress(index: number) {
    this.addresses.splice(index, 1);
  }

  saveAddress(index: number) {
    // Logic to save address
    console.log('Saving address at index', index);
  }

  protected readonly open = open;
  protected readonly DialogChangePasswordComponent = ChangePasswordDialogComponent;
}
