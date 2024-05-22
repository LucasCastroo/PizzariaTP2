import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatFabButton, MatIconButton} from "@angular/material/button";
import {Ingrediente} from "../../models/ingrediente";
import {IngredienteService} from "../../services/ingrediente.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {IngredienteDialogComponent} from "./ingrediente-dialog/ingrediente-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {DialogDeleteComponent} from "../template/template-admin/dialog-delete/dialog-delete.component";

@Component({
  selector: 'app-ingrediente-list',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatTable,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatHeaderCellDef,
    MatPaginator,
    MatFabButton,
    MatToolbar,
    MatDrawer,
    MatDrawerContainer,
    MatAnchor
  ],
  templateUrl: './ingrediente-list.component.html',
  styleUrl: './ingrediente-list.component.css'
})
export class IngredienteListComponent implements OnInit{
  ingredientes: Ingrediente[] = []
  displayedColumns = ["id", "nome", "categoria", "preco", "acao"]
  pageSize = 20
  totalRecords = 0;
  page = 0;
  constructor(protected service: IngredienteService, public dialog: MatDialog) {
  }

  ngOnInit() {
    this.service.findAll(this.page, this.pageSize).subscribe({
      next: value => {
        this.ingredientes = value
      }
    });
    this.service.count().subscribe({
      next: value => {
        this.totalRecords = value;
      }
    })
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }
  protected readonly IngredienteDialogComponent = IngredienteDialogComponent;
  protected readonly window = window;
  protected readonly DialogDeleteComponent = DialogDeleteComponent;
}
