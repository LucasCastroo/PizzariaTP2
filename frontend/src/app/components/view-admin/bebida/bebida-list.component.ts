import {Component, OnInit} from '@angular/core';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatAnchor, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {DecimalPipe} from "@angular/common";
import {BebidaDialogComponent} from "./bebida-dialog/bebida-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {BebidaService} from "../../../services/bebida.service";
import {ProdutoService} from "../../../services/produto.service";
import {
  ImagemUploadDialogComponent
} from "../../template/admin/template-admin/imagem-upload-dialog/imagem-upload-dialog.component";
import {ImageDialogComponent} from "../../template/admin/template-admin/image-dialog/image-dialog.component";
import {DialogDeleteComponent} from "../../template/admin/template-admin/dialog-delete/dialog-delete.component";
import {Bebida} from "../../../models/bebida";

@Component({
  selector: 'app-bebida-list',
  standalone: true,
    imports: [
        MatCell,
        MatCellDef,
        MatColumnDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatIconButton,
        MatRow,
        MatRowDef,
        MatTable,
        MatPaginator,
        MatHeaderCellDef,
        DecimalPipe,
        MatFabButton,
        MatToolbar,
        MatDrawer,
        MatDrawerContainer,
        MatAnchor
    ],
  templateUrl: './bebida-list.component.html',
  styleUrl: './bebida-list.component.css'
})
export class BebidaListComponent implements OnInit {
  displayedColumns = ["id", "nome", "descricao", "kCal", "preco", "ml", "imagem", "acao"]
  bebidas: Bebida[] = []
  pageSize = 20
  totalRecords = 0;
  page = 0;
  constructor(private service: BebidaService, protected dialog: MatDialog,
              protected produtoService: ProdutoService) {
  }

  ngOnInit() {
    this.service.findAll(this.page, this.pageSize).subscribe({
      next: value => this.bebidas = value
    });
    this.service.countBebidas().subscribe({
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

  delete(id: number){
    this.produtoService.delete(id).subscribe({
      next: value => {
        window.location.reload();
      }
    });
  }

  protected readonly parseFloat = parseFloat;
  protected readonly BebidaDialogComponent = BebidaDialogComponent;
  protected readonly window = window;
  protected readonly ImagemUploadDialogComponent = ImagemUploadDialogComponent;
  protected readonly ImageDialogComponent = ImageDialogComponent;
  protected readonly DialogDeleteComponent = DialogDeleteComponent;
}
