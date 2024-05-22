import { Routes } from '@angular/router';
import {LoginAdminComponent} from "./components/vision-admin/login-admin/login-admin.component";
import {FuncionarioContaComponent} from "./components/vision-admin/funcionario/conta/funcionario-conta.component";
import {ClienteContaComponent} from "./components/vision-admin/cliente/conta/cliente-conta.component";
import {CupomComponent} from "./components/vision-admin/cupom/cupom.component";
import {PizzaListComponent} from "./components/vision-admin/pizza/pizza-list.component";
import {IngredienteListComponent} from "./components/vision-admin/ingrediente/ingrediente-list.component";
import {BebidaListComponent} from "./components/vision-admin/bebida/bebida-list.component";
import {UsuarioComponent} from "./components/vision-admin/usuario/usuario.component";
import {LoginComponent} from "./components/vision-cliente/login/login.component";
import {HomeComponent} from "./components/vision-cliente/home/home.component";
import {AdminTemplateComponent} from "./components/template/admin/admin-template/admin-template.component";

export const routes: Routes = [

  {
    path: '',
    component: AdminTemplateComponent,
    title: 'Administrativo Pizzaria',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'contas-cliente'},

      {path: 'cupons', component: CupomComponent, title: 'Cupons'},
      {path: 'contas-cliente', component: ClienteContaComponent, title: 'Contas Clientes'},
      {path: 'contas-funcionario', component: FuncionarioContaComponent, title: 'Contas Colaboradores'},
      {path: "pizzas", component: PizzaListComponent, title: "Pizzas"},
      {path: "ingredientes", component: IngredienteListComponent, title: "Ingredientes"},
      {path: "bebidas", component: BebidaListComponent, title: "Bebidas"},
      {path: "usuarios", component: UsuarioComponent, title: "Conta Usuário"}
    ]
  },
  {path: "login-admin", component: LoginAdminComponent, title: "Login Admin"},
  {path: "admin", component: LoginAdminComponent, title: "Login Admin"},

  {path: "login", component: LoginComponent, title: "Login"},
  {path: "home", component: HomeComponent, title: "Home"},
  {path: "", component: HomeComponent, title: "Home"},
];
