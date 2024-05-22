import {Component, OnInit} from '@angular/core';
import {PizzaService} from "../../services/pizza.service";
import {MatButtonModule} from '@angular/material/button';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {Pizza} from "../../models/pizza";
import {MatIcon} from "@angular/material/icon";
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {PizzaDialogComponent} from "./pizza-dialog/pizza-dialog.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {NgOptimizedImage} from "@angular/common";
import {ImageDialogComponent} from "../template/template-admin/image-dialog/image-dialog.component";
import {ImagemUploadDialogComponent} from "../template/template-admin/imagem-upload-dialog/imagem-upload-dialog.component";
import {ToolbarSidenavComponent} from "../template/toolbar-sidenav/toolbar-sidenav.component";
import {DialogDeleteComponent} from "../template/template-admin/dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [
    MatTable,
    MatColumnDef,
    MatCell,
    MatCellDef,
    MatHeaderCell,
    MatIcon,
    MatIconButton,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    MatDialogModule,
    MatFabButton,
    MatToolbar,
    MatDrawer,
    MatDrawerContainer,
    MatButtonModule,
    NgOptimizedImage,
    ToolbarSidenavComponent
  ],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.css'
})
export class PizzaListComponent implements OnInit{
  displayedColumns = ["id", "nome", "descricao", "kCal", "quantPorcoes", "preco", "tamanhoPizza", "imagem", "acao"]
  pizzas: Pizza[] = []
  constructor(private service: PizzaService, public dialog: MatDialog) {
  }
  ngOnInit(): void {
    this.service.findAll(0, 20).subscribe({
      next: value => {
        this.pizzas = value;
      }
    })
  }

  protected readonly PizzaDialogComponent = PizzaDialogComponent;
  protected readonly ImageDialogComponent = ImageDialogComponent;
  protected readonly ImagemUploadDialogComponent = ImagemUploadDialogComponent;
  protected readonly DialogDeleteComponent = DialogDeleteComponent;
}
