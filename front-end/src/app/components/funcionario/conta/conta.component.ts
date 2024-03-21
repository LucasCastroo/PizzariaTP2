import { Component } from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {funcionarioService} from "../../../services/funcionario.service";
import {MatDialog} from "@angular/material/dialog";
import {Funcionario} from "../../../models/funcionario";
import {DialogCreateComponent} from "./dialog-create/dialog-create.component";

@Component({
  selector: 'app-conta',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatFabButton,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    MatToolbar,
    RouterLink
  ],
  templateUrl: './conta.component.html',
  styleUrl: './conta.component.css'
})
export class ContaComponent {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'nascimento','email', 'telefone', 'acao'];
  funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: funcionarioService,
              public dialog: MatDialog,
              private router: Router,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.funcionarioService.findAll().subscribe(data => {
      this.funcionarios = data;
    })
  }

  protected readonly DialogCreateComponent = DialogCreateComponent;
}
