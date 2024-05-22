import {Component, Inject} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {BebidaService} from "../../../../services/bebida.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {PizzaService} from "../../../../services/pizza.service";
import {UsuarioService} from "../../../../services/usuario.service";
import {FuncionarioService} from "../../../../services/funcionario.service";
import {Funcionario} from "../../../../models/funcionario";
import {ClienteService} from "../../../../services/cliente.service";
import {Cliente} from "../../../../models/cliente";
import {Usuario} from "../../../../models/usuario";
import {CupomService} from "../../../../services/cupom.service";
import {IngredienteService} from "../../../../services/ingrediente.service";

@Component({
  selector: 'app-dialog-delete',
  standalone: true,
  imports: [
    MatButton,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
  ],
  templateUrl: './dialog-delete.component.html',
  styleUrl: './dialog-delete.component.css'
})
export class DialogDeleteComponent {
  constructor(public router: Router, public dialogRef: MatDialogRef<DialogDeleteComponent>, private serviceBebida: BebidaService, private serviceIgrediente: IngredienteService,
              private servicePizza: PizzaService, private serviceFuncionario: FuncionarioService, private serviceCliente: ClienteService, private serviceUsuario: UsuarioService,
              protected snackBar: MatSnackBar, @Inject(MAT_DIALOG_DATA) protected data: number, @Inject(MAT_DIALOG_DATA) protected funcionario: Funcionario, private serviceCupom: CupomService,
              @Inject(MAT_DIALOG_DATA) protected cliente: Cliente, @Inject(MAT_DIALOG_DATA) protected usuario: Usuario, @Inject(MAT_DIALOG_DATA) protected cupom: string) {
    this.messagemDialog();
  }

  currentUrl = this.router.url;
  messageDialog = '';

  delete(): void{
    if (this.currentUrl.includes('/bebidas')) {
      this.serviceBebida.delete(this.data).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (err) =>{
          console.log('Erro ao Deletar Bebida' + JSON.stringify(err));
          this.showSnackBarBottomPosition('Erro ao Deletar Bebida!', '', 3000);
        }
      })
    } else if(this.currentUrl.includes('/pizzas')) {
      this.servicePizza.delete(this.data).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (err) =>{
          console.log('Erro ao Deletar Pizza' + JSON.stringify(err));
          this.showSnackBarBottomPosition('Erro ao Deletar Pizza!', '', 3000);
        }
      })
    } else if (this.currentUrl.includes('/contas-funcionario')) {
      this.serviceFuncionario.delete(this.funcionario).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (err) =>{
          console.log('Erro ao Deletar Funcionario' + JSON.stringify(err));
          this.showSnackBarBottomPosition('Erro ao Deletar Funcionário!', '', 3000);
        }
      })
    } else if (this.currentUrl.includes('/usuarios')) {
      this.serviceUsuario.delete(this.usuario).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (err) =>{
          console.log('Erro ao Deletar Usuario' + JSON.stringify(err));
          this.showSnackBarBottomPosition('Erro ao Deletar Usuário!', '', 3000);
        }
      })
    } else if (this.currentUrl.includes('/contas-cliente')) {
      this.serviceCliente.delete(this.cliente).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (err) =>{
          console.log('Erro ao Deletar Cliente' + JSON.stringify(err));
          this.showSnackBarBottomPosition('Erro ao Deletar Cliente!', '', 3000);
        }
      })
    } else if (this.currentUrl.includes('/cupons')) {
      this.serviceCupom.delete(this.cupom).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (err) =>{
          console.log('Erro ao Deletar Cupom' + JSON.stringify(err));
          this.showSnackBarBottomPosition('Erro ao Deletar Cupom!', '', 3000);
        }
      })
    } else if (this.currentUrl.includes('/ingredientes')) {
      this.serviceIgrediente.delete(this.data).subscribe({
        next: () =>{
          window.location.reload();
        },
        error: (err) =>{
          console.log('Erro ao Deletar Ingrediente' + JSON.stringify(err));
          this.showSnackBarBottomPosition('Erro ao Deletar Ingrediente!', '', 3000);
        }
      })
    }
  }

  showSnackBarBottomPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }

  messagemDialog(): void {
    if (this.currentUrl.includes('/usuarios')) {
      this.messageDialog = 'Deseja realmente excluir este usuário?';
    } else if(this.currentUrl.includes('/contas-cliente')) {
      this.messageDialog = 'Deseja realmente excluir este cliente?';
    } else if(this.currentUrl.includes('/contas-funcionario')) {
      this.messageDialog = 'Deseja realmente excluir este funcionário?';
    } else if(this.currentUrl.includes('/cupons')) {
      this.messageDialog = 'Deseja realmente excluir este cupom?';
    } else if(this.currentUrl.includes('/pizzas')) {
      this.messageDialog = 'Deseja realmente excluir esta pizza?';
    } else if(this.currentUrl.includes('/bebidas')) {
      this.messageDialog = 'Deseja realmente excluir esta bebida?';
    } else if(this.currentUrl.includes('/ingredientes')) {
      this.messageDialog = 'Deseja realmente excluir este igrediente?';
    }
  }
}
