import {Component, OnInit, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton, MatIconButton} from "@angular/material/button";
import {Pizza} from "../../../models/pizza";
import {Bebida} from "../../../models/bebida";
import {BebidaService} from "../../../services/bebida.service";
import {PizzaService} from "../../../services/pizza.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {CurrencyPipe, NgForOf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";


type CardPizza = {
  id: number;
  pizza: string;
  tamanho: string;
  ingredientes: string;
  preco: number;
  urlImagem: string;
}

type CardBebida = {
  id: number;
  bebida: string;
  litros: string;
  preco: number;
  urlImagem: string;
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [
    MatCardModule,
    MatButton,
    NgForOf,
    CurrencyPipe,
    MatIconButton,
    MatIcon
  ],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent implements OnInit{

  cardsPizza = signal<CardPizza[]>([]);
  cardsBebida = signal<CardBebida[]>([]);

  pizzas: Pizza[] = [];
  bebidas: Bebida[] = [];


  constructor(
    private pizzaService: PizzaService,
    private bebidaService: BebidaService,
    // private carrinhoService: CarrinhoService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.carregarCardapio();
  }

  carregarCardapio() {
    this.pizzaService.findAll(0, 10).subscribe(data => {
      this.pizzas = data;
      this.carregarCards();
    });

    this.bebidaService.findAll(0, 10).subscribe(data => {
      this.bebidas = data;
      this.carregarCards();
    });
  }

  carregarCards() {
    const cardsPizza: CardPizza[] = [];
    const cardsBebida: CardBebida[] = [];

    this.pizzas.forEach(pizza => {
      const ingredientes = pizza.porcoes
        .flatMap(porcao => porcao.ingredientes.map(ing => ing.nome))
        .join(', ');

      cardsPizza.push({
        id: pizza.id,
        pizza: pizza.nome,
        tamanho: pizza.tamanhoPizza.toString(),
        ingredientes: ingredientes,
        preco: pizza.preco,
        urlImagem: pizza.nomeImagem || ''
      });
    });
    this.cardsPizza.set(cardsPizza);

    this.bebidas.forEach(bebida => {
      const litros = bebida.ml < 1000
        ? `${bebida.ml}ml`
        : Number.isInteger(bebida.ml / 1000)
          ? `${(bebida.ml / 1000).toString().replace('.', ',')}L`
          : `${(bebida.ml / 1000).toFixed(1).replace('.', ',')}L`;
      cardsBebida.push({
        id: bebida.id,
        preco: bebida.preco,
        bebida: bebida.nome,
        litros: litros,
        urlImagem: bebida.nomeImagem || ''
      });
    });
    this.cardsBebida.set(cardsBebida);
  }

  // adicionarAoCarrinho(card: Card) {
  //   this.showSnackbarTopPosition('Produto adicionado ao carrinho!', 'Fechar');
  //   this.carrinhoService.adicionar({
  //     id: card.idConsulta,
  //     nome: card.titulo,
  //     preco: card.preco,
  //     quantidade: 1
  //   });
  // }

  showSnackbarTopPosition(content: any, action: any) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
    });
  }
}
