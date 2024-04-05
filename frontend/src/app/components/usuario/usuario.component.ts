import { Component } from '@angular/core';
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
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {Usuario} from "../../models/usuario";
import {UsuarioDialogComponent} from "./usuario-dialog/usuario-dialog.component";
import {UsuarioService} from "../../services/usuario.service";
import {UsuarioDialogDeleteComponent} from "./usuario-dialog-delete/usuario-dialog-delete.component";

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
    MatHeaderCellDef
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent {
  displayedColumns: string[] = ['id', 'nome', 'cpf', 'nascimento','email', 'acao'];
  usuarios: Usuario[] = [];

  constructor(private suarioService: UsuarioService,
              public dialog: MatDialog, private router: Router) {
  }

  ngOnInit() {
    this.suarioService.findAll().subscribe(data => {
      this.usuarios = data;
    })
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  protected readonly DialogUsuarioComponent = UsuarioDialogComponent;
  protected readonly DialogDeleteComponent = UsuarioDialogDeleteComponent;
}
