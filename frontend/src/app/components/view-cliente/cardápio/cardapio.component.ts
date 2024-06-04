import {Component, OnInit, signal} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from "@angular/material/button";
import {Pizza} from "../../../models/pizza";
import {Bebida} from "../../../models/bebida";
import {BebidaService} from "../../../services/bebida.service";
import {PizzaService} from "../../../services/pizza.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CurrencyPipe, NgForOf} from "@angular/common";


type CardPizza = {
  id: number;
  descricao: string;
  tamanho: string;
  ingredientes: string;
  preco: number;
  urlImagem: string;
}

type CardBebida = {
  id: number;
  bebida: string;
  litros: number;
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
    CurrencyPipe
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
      cardsPizza.push({
        id: pizza.id,
        descricao: pizza.descricao,
        tamanho: '',
        ingredientes: '',
        preco: pizza.preco,
        urlImagem: ''
      });
    });
    this.cardsPizza.set(cardsPizza);

    this.bebidas.forEach(bebida => {
      cardsBebida.push({
        id: bebida.id,
        preco: bebida.preco,
        bebida: bebida.nome,
        litros: bebida.ml,
        urlImagem: ''
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
