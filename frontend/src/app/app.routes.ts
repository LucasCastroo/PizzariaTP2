import { Routes } from '@angular/router';
import {AdminTemplateComponent} from "./components/template/admin/admin-template/admin-template.component";
import {CupomComponent} from "./components/view-admin/cupom/cupom.component";
import {ClienteContaComponent} from "./components/view-admin/cliente/conta/cliente-conta.component";
import {FuncionarioContaComponent} from "./components/view-admin/funcionario/conta/funcionario-conta.component";
import {PizzaListComponent} from "./components/view-admin/pizza/pizza-list.component";
import {IngredienteListComponent} from "./components/view-admin/ingrediente/ingrediente-list.component";
import {BebidaListComponent} from "./components/view-admin/bebida/bebida-list.component";
import {UsuarioComponent} from "./components/view-admin/usuario/usuario.component";
import {LoginAdminComponent} from "./components/view-admin/login-admin/login-admin.component";
import {LoginComponent} from "./components/view-cliente/login/login.component";
import {HomeComponent} from "./components/view-cliente/home/home.component";
import {ClienteTemplateComponent} from "./components/template/cliente/cliente-template/cliente-template.component";

export const routes: Routes = [

  {
    path: 'admin',
    component: AdminTemplateComponent,
    title: 'Administrativo Pizzaria',
    children: [
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

  {
    path: '',
    component: ClienteTemplateComponent,
    title: 'Come e Dorme Pizzaria',
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {path: "home", component: HomeComponent, title: "Home"},
    ]
  },
];
