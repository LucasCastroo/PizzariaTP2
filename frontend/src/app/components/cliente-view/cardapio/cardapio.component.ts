import {Component, OnInit} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {Pizza} from "../../../models/pizza";
import {Bebida} from "../../../models/bebida";
import {BebidaService} from "../../../services/bebida.service";
import {PizzaService} from "../../../services/pizza.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {SacolaService} from "../../../services/sacola.service";


@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    NgForOf,
    CurrencyPipe
  ],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit{

  pizzas: Pizza[] = [];
  bebidas: Bebida[] = [];


  constructor(
    private pizzaService: PizzaService,
    private bebidaService: BebidaService,
    protected sacolaService: SacolaService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.pizzaService.findAll(0, 10).subscribe(data => {
      this.pizzas = data;
    });

    this.bebidaService.findAll(0, 10).subscribe(data => {
      this.bebidas = data;
    });
  }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
