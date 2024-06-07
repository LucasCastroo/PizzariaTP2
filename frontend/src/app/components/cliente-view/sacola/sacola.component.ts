import {Component, OnInit} from '@angular/core';
import {SacolaService} from "../../../services/sacola.service";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {isPizza} from "../../../models/produto";
import {formatarMl} from "../../../utils/utils";
import {formatTamanhoPizza} from "../../../models/pizza";
import {MatButton} from "@angular/material/button";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {FormaPagamento, Pedido} from "../../../models/pedido";
import {UsuarioService} from "../../../services/usuario.service";
import {Endereco} from "../../../models/endereco";
import {PedidoService} from "../../../services/pedido.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sacola',
  standalone: true,
  imports: [MatTable, MatCell, MatCellDef, MatColumnDef, MatHeaderCell, MatHeaderCellDef, MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef, MatButton, ReactiveFormsModule, MatFormField, MatInput, MatLabel],
  templateUrl: './sacola.component.html',
  styleUrl: './sacola.component.css'
})
export class SacolaComponent implements OnInit {
  displayedColumns = ["nome", "quantidade", "precoUnit", "precoTotal"]
  form = this.fb.group({
    codigoCupom: ["", ""],
    idEndereco: [-1, [Validators.required]],
    formaPagamento: [FormaPagamento.PIX, [Validators.required]],
  })
  enderecos: Endereco[] = []
  protected readonly parseFloat = parseFloat;
  protected readonly isPizza = isPizza;
  protected readonly formatarMl = formatarMl;
  protected readonly formatTamanhoPizza = formatTamanhoPizza;
  protected readonly FormaPagamento = FormaPagamento;

  constructor(protected sacolaService: SacolaService, private fb: FormBuilder, protected usuarioService: UsuarioService, private pedidoService: PedidoService, private router: Router) {

  }

  ngOnInit() {
    this.usuarioService.getEnderecos().subscribe(enderecos => {
      this.enderecos = enderecos;
      this.form.controls.idEndereco.setValue(enderecos.at(-1)?.id || null)
    })
  }

  fazerPedido() {
    let pedido = (this.form.value as unknown) as Pedido;
    pedido.items = this.sacolaService.getSacola().map(prod => {
      return {
        quantidade: prod.quantidade,
        idProduto: prod.produto.id
      }
    })
    this.pedidoService.create(pedido).subscribe(pedido => {
      this.sacolaService.limparSacola();
      setTimeout(() => {
        this.pedidoService.pagar(pedido.id!).subscribe();
      }, 5000);
      this.router.navigateByUrl(`/pedido/${pedido.id}`).then();
    })
  }
}
