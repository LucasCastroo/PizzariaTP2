import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTableModule
} from "@angular/material/table";
import {MatButton, MatButtonModule, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {RouterLink} from "@angular/router";
import {FuncionarioService} from "../../../services/funcionario.service";
import {MatDialog} from "@angular/material/dialog";
import {Funcionario} from "../../../models/funcionario";
import {DialogCreateFuncionarioComponent} from "./dialog-create-funcionario/dialog-create-funcionario.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-conta-funcionario',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIconModule,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTableModule,
    MatToolbar,
    RouterLink,
    MatButton,
    MatSidenavModule,
    MatButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './conta-funcionario.component.html',
  styleUrl: './conta-funcionario.component.css'
})
export class ContaFuncionarioComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'nascimento','email', 'tipoAcesso', 'acao'];
  funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.funcionarioService.findAll().subscribe(data => {
      this.funcionarios = data;
    })
  }

  protected readonly DialogCreateComponent = DialogCreateFuncionarioComponent;
}