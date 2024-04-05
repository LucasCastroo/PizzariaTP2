import {Component, OnInit} from '@angular/core';
import {PizzaService} from "../../services/pizza.service";
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
import {CupomDialogComponent} from "../cupom/cupom-dialog/cupom-dialog.component";
import {MatToolbar} from "@angular/material/toolbar";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {Router} from "@angular/router";

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
    MatDrawerContainer
  ],
  templateUrl: './pizza-list.component.html',
  styleUrl: './pizza-list.component.css'
})
export class PizzaListComponent implements OnInit{
  displayedColumns = ["id", "nome", "descricao", "kCal", "quantPorcoes", "preco", "tamanhoPizza", "acao"]
  pizzas: Pizza[] = []
  constructor(private service: PizzaService, public dialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.service.findAll(0, 20).subscribe({
      next: value => {
        this.pizzas = value;
      }
    })
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  protected readonly PizzaDialogComponent = PizzaDialogComponent;
    protected readonly DialogCupomComponent = CupomDialogComponent;
}
