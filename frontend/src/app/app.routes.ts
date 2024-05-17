import { Routes } from '@angular/router';
import {LoginAdminComponent} from "./components/login-admin/login-admin.component";
import {FuncionarioContaComponent} from "./components/funcionario/conta/funcionario-conta.component";
import {ClienteContaComponent} from "./components/cliente/conta/cliente-conta.component";
import {CupomComponent} from "./components/cupom/cupom.component";
import {PizzaListComponent} from "./components/pizza/pizza-list.component";
import {IngredienteListComponent} from "./components/ingrediente/ingrediente-list.component";
import {BebidaListComponent} from "./components/bebida/bebida-list.component";
import {UsuarioComponent} from "./components/usuario/usuario.component";
import {LoginComponent} from "./components/vision-cliente/login/login.component";
import {HomeComponent} from "./components/vision-cliente/home/home.component";

export const routes: Routes = [{path: "login-admin", component: LoginAdminComponent, title: "Login Admin"},
  {path: "cupons", component: CupomComponent, title: "Cupons"},
  {path: 'contas-cliente', component: ClienteContaComponent, title: 'Contas Clientes'},
  {path: 'contas-funcionario', component: FuncionarioContaComponent, title: 'Contas Colaboradores'},
  {path: "pizza", component: PizzaListComponent, title: "Pizzas"},
  {path: "ingrediente", component: IngredienteListComponent, title: "Ingredientes"},
  {path: "bebida", component: BebidaListComponent, title: "Bebidas"},
  {path: "usuario", component: UsuarioComponent, title: "Conta Usuário"},

  {path: "login", component: LoginComponent, title: "Login"},
  {path: "home", component: HomeComponent, title: "Home"}
];
