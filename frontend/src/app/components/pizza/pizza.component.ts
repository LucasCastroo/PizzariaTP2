import {Component, OnInit} from '@angular/core';
import {PizzaService} from "../../services/pizza.service";

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [],
  templateUrl: './pizza.component.html',
  styleUrl: './pizza.component.css'
})
export class PizzaComponent implements OnInit{
  constructor(private service: PizzaService) {
  }
  ngOnInit(): void {
    this.service.findAll(0, 20).subscribe({
      next: value => {
        console.log(value);
      }
    })

  }

}
