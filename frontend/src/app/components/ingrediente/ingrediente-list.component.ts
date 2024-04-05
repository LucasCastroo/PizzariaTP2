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
import {MatFabButton, MatIconButton} from "@angular/material/button";
import {Ingrediente} from "../../models/ingrediente";
import {IngredienteService} from "../../services/ingrediente.service";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {PizzaDialogComponent} from "../pizza/pizza-dialog/pizza-dialog.component";
import {IngredienteDialogComponent} from "./ingrediente-dialog/ingrediente-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {CupomDialogComponent} from "../cupom/cupom-dialog/cupom-dialog.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {Router} from "@angular/router";

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
    MatDrawerContainer
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
  constructor(protected service: IngredienteService, public dialog: MatDialog, private router: Router) {
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

  logout() {
    this.router.navigateByUrl('/login');
  }

  paginar(event: PageEvent): void {
    this.page = event.pageIndex;
    this.pageSize = event.pageSize;
    this.ngOnInit();
  }
  delete(id: number){
    this.service.delete(id).subscribe({
      next: value => {
        window.location.reload();
      }
    });
  }
  protected readonly PizzaDialogComponent = PizzaDialogComponent;
  protected readonly IngredienteDialogComponent = IngredienteDialogComponent;
  protected readonly window = window;
  protected readonly DialogCupomComponent = CupomDialogComponent;
}
