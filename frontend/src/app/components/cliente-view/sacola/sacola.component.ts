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
import {isPizza} from "../../../models/produto";
import {formatarMl} from "../../../utils/utils";
import {formatTamanhoPizza} from "../../../models/pizza";

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
  protected readonly isPizza = isPizza;
  protected readonly formatarMl = formatarMl;
  protected readonly formatTamanhoPizza = formatTamanhoPizza;
}
