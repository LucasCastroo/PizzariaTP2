import { Component } from '@angular/core';
import {SacolaService} from "../../../services/sacola.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";

@Component({
  selector: 'app-sacola',
  standalone: true,
  imports: [
    MatTable,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef
  ],
  templateUrl: './sacola.component.html',
  styleUrl: './sacola.component.css'
})
export class SacolaComponent {
  displayedColumns = ["nome", "quantidade", "precoUnit", "precoTotal"]
  constructor(protected sacolaService: SacolaService) {

  }


  protected readonly parseFloat = parseFloat;
}
