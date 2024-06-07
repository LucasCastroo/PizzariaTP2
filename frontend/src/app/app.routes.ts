import { Routes } from '@angular/router';
import { AdminTemplateComponent } from "./components/template/admin/admin-template/admin-template.component";
import { CupomComponent } from "./components/admin-view/cupom/cupom.component";
import { ClienteContaComponent } from "./components/admin-view/cliente/conta/cliente-conta.component";
import { FuncionarioContaComponent } from "./components/admin-view/funcionario/conta/funcionario-conta.component";
import { PizzaListComponent } from "./components/admin-view/pizza/pizza-list.component";
import { IngredienteListComponent } from "./components/admin-view/ingrediente/ingrediente-list.component";
import { BebidaListComponent } from "./components/admin-view/bebida/bebida-list.component";
import { UsuarioComponent } from "./components/admin-view/usuario/usuario.component";
import { LoginAdminComponent } from "./components/admin-view/login-admin/login-admin.component";
import { LoginComponent } from "./components/cliente-view/login/login.component";
import { HomeComponent } from "./components/cliente-view/home/home.component";
import { ClienteTemplateComponent } from "./components/template/cliente/cliente-template/cliente-template.component";
import { MinhaContaComponent } from "./components/cliente-view/minha-conta/minha-conta.component";
import {SacolaComponent} from "./components/cliente-view/sacola/sacola.component";
import {PedidosComponent} from "./components/admin-view/pedidos/pedidos.component";

export const routes: Routes = [

  // Default Route
  {
    path: '',
    component: ClienteTemplateComponent,
    title: 'Come e Dorme Pizzaria',
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent, title: 'Home' }
    ]
  },

  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'minha-conta', component: MinhaContaComponent, title: 'Minha Conta' },
  { path: 'sacola', component: SacolaComponent, title: "Sacola"},

  { path: 'login-admin', component: LoginAdminComponent, title: 'Login Admin' },
  { path: 'admin', component: LoginAdminComponent, title: 'Login Admin' },

  {
    path: '',
    component: AdminTemplateComponent,
    title: 'Administrativo Pizzaria',
    children: [
      { path: 'cupons', component: CupomComponent, title: 'Cupons' },
      { path: 'contas-cliente', component: ClienteContaComponent, title: 'Contas Clientes' },
      { path: 'contas-funcionario', component: FuncionarioContaComponent, title: 'Contas Colaboradores' },
      { path: 'pizzas', component: PizzaListComponent, title: 'Pizzas' },
      { path: 'ingredientes', component: IngredienteListComponent, title: 'Ingredientes' },
      { path: 'bebidas', component: BebidaListComponent, title: 'Bebidas' },
      { path: 'usuarios', component: UsuarioComponent, title: 'Conta Usuário' },
      { path: 'pedidos', component: PedidosComponent, title: 'Pedidos' },
    ]
  },
];
