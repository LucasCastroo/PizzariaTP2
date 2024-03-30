import { Routes } from '@angular/router';
import { ContaClienteComponent } from "./components/cliente/conta/conta-cliente.component";
import { ContaFuncionarioComponent } from "./components/funcionario/conta/conta-funcionario.component";
import { clienteResolver } from "./components/cliente/conta/resolver/cliente-resolver";
import { funcionarioResolver } from "./components/funcionario/conta/resolver/funcionario.resolver";

export const routes: Routes = [
  { path: 'contas-cliente', component: ContaClienteComponent, title: 'Contas' },
  { path: 'contas-cliente/edit/:id', component: ContaClienteComponent, resolve: {cliente: clienteResolver}},

  { path: 'contas-funcionario', component: ContaFuncionarioComponent, title: 'Contas' },
  { path: 'contas-funcionario/edit/:id', component: ContaFuncionarioComponent, resolve: {cliente: funcionarioResolver}},
];
