import {Component} from '@angular/core';
import {PedidoService} from "../../../services/pedido.service";
import {ActivatedRoute} from "@angular/router";
import {formatFormaPagamento, formatStatus, Pedido, ProdutoPedido} from "../../../models/pedido";
import {Title} from "@angular/platform-browser";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {formatDate, NgForOf, NgIf} from "@angular/common";
import {isPizza} from "../../../models/produto";
import {formatTamanhoPizza} from "../../../models/pizza";
import {formatarMl} from "../../../utils/utils";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {HeaderComponent} from "../../template/cliente/header/header.component";
import {FooterComponent} from "../../template/cliente/footer/footer.component";

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [
    MatProgressSpinner,
    NgIf,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatRow,
    MatRowDef,
    MatTable,
    MatHeaderCellDef,
    HeaderComponent,
    FooterComponent,
    NgForOf
  ],
  templateUrl: './pedido.component.html',
  styleUrl: './pedido.component.css'
})
export class PedidoComponent {
  displayedColumns = ["nome", "quantidade", "precoUnit", "precoTotal"]
  pedido: Pedido | undefined;
  dataSource = new MatTableDataSource<ProdutoPedido>();

  constructor(private service: PedidoService, private route: ActivatedRoute, private titleService: Title) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get("id")
    if (id) {
      this.titleService.setTitle(id);
      this.service.get(Number.parseInt(id)).subscribe(pedido => {
        this.pedido = pedido;
        this.dataSource.data = pedido.items as ProdutoPedido[];
      });
    }
  }

  protected readonly isPizza = isPizza;
  protected readonly formatTamanhoPizza = formatTamanhoPizza;
  protected readonly formatarMl = formatarMl;
  protected readonly parseFloat = parseFloat;
  protected readonly formatFormaPagamento = formatFormaPagamento;
  protected readonly Date = Date;
  protected readonly formatDate = formatDate;
  protected readonly formatStatus = formatStatus;
}
