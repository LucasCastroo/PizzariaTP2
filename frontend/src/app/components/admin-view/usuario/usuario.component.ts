import {AfterViewInit, Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {MatAnchor, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {UsuarioDialogComponent} from "./usuario-dialog/usuario-dialog.component";
import {Usuario} from "../../../models/usuario";
import {UsuarioService} from "../../../services/usuario.service";
import {DialogDeleteComponent} from "../../template/admin/template-admin/dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-usuario',
  standalone: true,
    imports: [
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatDrawer,
        MatDrawerContainer,
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
        MatHeaderCellDef,
        MatAnchor
    ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit{
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'nascimento','email', 'acao'];
  usuarios: Usuario[] = [];

  constructor(private usuarioService: UsuarioService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.usuarioService.findAll().subscribe(data => {
      this.usuarios = data;
    })
  }

  protected readonly DialogUsuarioComponent = UsuarioDialogComponent;
  protected readonly DialogDeleteComponent = DialogDeleteComponent;

}
