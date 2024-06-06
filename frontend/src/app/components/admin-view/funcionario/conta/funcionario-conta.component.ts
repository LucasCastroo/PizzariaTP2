import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
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
import {MatDialog} from "@angular/material/dialog";
import {FuncionarioDialogComponent} from "./funcionario-dialog/funcionario-dialog.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {NgOptimizedImage} from "@angular/common";
import {Funcionario} from "../../../../models/funcionario";
import {FuncionarioService} from "../../../../services/funcionario.service";
import {DialogDeleteComponent} from "../../../template/admin/template-admin/dialog-delete/dialog-delete.component";
import {ActivatedRoute} from "@angular/router";
import {forkJoin, merge, Subscription} from "rxjs";
import {UsuarioService} from "../../../../services/usuario.service";
import {NivelAcesso} from "../../../../models/nivel-acesso";

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
    MatButton,
    MatSidenavModule,
    MatButtonModule,
    NgOptimizedImage
  ],
  templateUrl: './funcionario-conta.component.html',
  styleUrl: './funcionario-conta.component.css'
})
export class FuncionarioContaComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'nascimento','email', 'tipoAcesso', 'acao'];
  funcionarios: Funcionario[] = [];

  constructor(private funcionarioService: FuncionarioService,
              public dialog: MatDialog, private route: ActivatedRoute, private usuarioService: UsuarioService) {

  }

  ngAfterViewInit() {
    if(this.route.snapshot.queryParamMap.get("me")){
      this.usuarioService.getFuncionario().subscribe(funcionario =>{
        this.dialog.open(FuncionarioDialogComponent, {
          height: '380px',
          width: '400px',
          data: funcionario
        });
      });
    }
    this.funcionarioService.findAll().subscribe(data => {
      this.funcionarios = data;
    });

  }

  protected readonly FuncionarioDialogComponent = FuncionarioDialogComponent;
  protected readonly DialogDeleteComponent = DialogDeleteComponent;
}
