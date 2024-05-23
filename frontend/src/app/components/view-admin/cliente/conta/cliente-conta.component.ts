import {Component, OnInit} from '@angular/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatButtonModule, MatFabButton} from "@angular/material/button";
import {RouterLink, RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {NgForOf, NgOptimizedImage} from "@angular/common";
import {MatTableModule} from "@angular/material/table";
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {ClienteDialogComponent} from "./cliente-dialog/cliente-dialog.component";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {Cliente} from "../../../../models/cliente";
import {ClienteService} from "../../../../services/cliente.service";
import {DialogDeleteComponent} from "../../../template/admin/template-admin/dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-conta-cliente',
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
      RouterModule, MatDrawer, MatDrawerContainer, NgOptimizedImage],
  templateUrl: './cliente-conta.component.html',
  styleUrl: './cliente-conta.component.css'
})

export class ClienteContaComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'nascimento','email', 'telefone', 'acao'];
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.clienteService.findAll().subscribe(data => {
      this.clientes = data;
    })
  }

  protected readonly DialogClienteComponent = ClienteDialogComponent;
  protected readonly DialogDeleteComponent = DialogDeleteComponent;
}

