import { Routes } from '@angular/router';
import {CupomListComponent} from "./components/cupom-list/cupom-list.component";
import {LoginFormComponent} from "./components/login-form/login-form.component";

export const routes: Routes = [
  {path: "login", component: LoginFormComponent, title: "Login"},
  {path: "cupons", component: CupomListComponent, title: "Lista de Cupons"}
];
