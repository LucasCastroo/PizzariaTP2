import { Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {funcionarioResolver} from "./components/funcionario/conta/resolver/funcionario.resolver";
import {ContaFuncionarioComponent} from "./components/funcionario/conta/conta-funcionario.component";
import {clienteResolver} from "./components/cliente/conta/resolver/cliente-resolver";
import {ContaClienteComponent} from "./components/cliente/conta/conta-cliente.component";
import {CupomComponent} from "./components/cupom/cupom.component";

export const routes: Routes = [
  { path: "login", component: LoginComponent, title: "Login"},

  { path: "cupons", component: CupomComponent, title: "Cupons"},
  { path: 'cupons/edit/:id', component: CupomComponent, title: 'Cupons' },

  { path: 'contas-cliente', component: ContaClienteComponent, title: 'Contas' },
  { path: 'contas-cliente/edit/:id', component: ContaClienteComponent, resolve: {cliente: clienteResolver}},

  { path: 'contas-funcionario', component: ContaFuncionarioComponent, title: 'Contas' },
  { path: 'contas-funcionario/edit/:id', component: ContaFuncionarioComponent, resolve: {cliente: funcionarioResolver}},
];
