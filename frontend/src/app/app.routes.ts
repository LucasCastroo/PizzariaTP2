import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {FuncionarioContaComponent} from "./components/funcionario/conta/funcionario-conta.component";
import {ClienteContaComponent} from "./components/cliente/conta/cliente-conta.component";
import {CupomComponent} from "./components/cupom/cupom.component";
import {PizzaListComponent} from "./components/pizza/pizza-list.component";
import {IngredienteListComponent} from "./components/ingrediente/ingrediente-list.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Login"},

  { path: "cupons", component: CupomComponent, title: "Cupons"},

  { path: 'contas-cliente', component: ClienteContaComponent, title: 'Contas Clientes' },

  { path: 'contas-funcionario', component: FuncionarioContaComponent, title: 'Contas Colaboradores' },

  {path: "pizza", component: PizzaListComponent, title: "Pizzas"},

  {path: "ingrediente", component: IngredienteListComponent, title: "Ingredientes"}
];
