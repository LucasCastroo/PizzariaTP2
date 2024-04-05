import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {ContaFuncionarioComponent} from "./components/funcionario/conta/conta-funcionario.component";
import {ContaClienteComponent} from "./components/cliente/conta/conta-cliente.component";
import {CupomComponent} from "./components/cupom/cupom.component";
import {PizzaListComponent} from "./components/pizza/pizza-list.component";
import {IngredienteListComponent} from "./components/ingrediente/ingrediente-list.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Login"},

  { path: "cupons", component: CupomComponent, title: "Cupons"},

  { path: 'contas-cliente', component: ContaClienteComponent, title: 'Contas' },

  { path: 'contas-funcionario', component: ContaFuncionarioComponent, title: 'Contas' },

  {path: "pizza", component: PizzaListComponent, title: "Pizzas"},

  {path: "ingrediente", component: IngredienteListComponent, title: "Ingredientes"}
];
