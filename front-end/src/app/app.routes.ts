import { Routes } from '@angular/router';
import { AccountComponent } from "./components/cliente/conta/account.component";
import { clienteResolver } from "./components/cliente/conta/resolver/cliente-resolver";

export const routes: Routes = [
  { path: 'contas', component: AccountComponent, title: 'Contas' },
  { path: 'contas/edit/:id', component: AccountComponent, resolve: {cliente: clienteResolver}},
];
