import {Component, Inject, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {ActivatedRoute, Router, RouterLink, RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {Cliente} from "../../../models/cliente";
import {ClienteService} from "../../../services/cliente.service";
import {MatDialog} from "@angular/material/dialog";
import {DialogCreateClienteComponent} from "./dialog-create-cliente/dialog-create-cliente.component";

@Component({
  selector: 'app-cliente-account',
  standalone: true,
  imports:
    [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    NgForOf,
    MatTableModule,
    MatToolbar,
    MatFabButton,
    RouterLink,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})

export class AccountComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'nascimento','email', 'telefone', 'acao'];
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService,
              public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.clienteService.findAll().subscribe(data => {
      this.clientes = data;
    })
  }

  protected readonly DialogCreateClienteComponent = DialogCreateClienteComponent;
}

