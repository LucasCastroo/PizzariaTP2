import {Component, OnInit} from '@angular/core';
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cupom} from "../../models/cupom";
import {CupomService} from "../../services/cupom.service";
import {DialogCreateCupomComponent} from "./dialog-create-cupom/dialog-create-cupom.component";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {DialogCreateClienteComponent} from "../cliente/conta/dialog-create-cliente/dialog-create-cliente.component";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-cupom-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDrawerContainer, MatDrawer, RouterLink],
  templateUrl: './cupom.component.html',
  styleUrl: './cupom.component.css'
})
export class CupomComponent implements OnInit{
  displayedColumns = ["id", "codigo", "desconto", "acao"];
  cupons: Cupom[] = []

  constructor(private service: CupomService, public dialog: MatDialog, protected snackBar: MatSnackBar){}

  ngOnInit() {
    this.service.findAll().subscribe(data =>{
      this.cupons = data.sort((a, b) => a.id - b.id);
    })
  }

  delete(id: string){
    this.service.delete(id).subscribe({
      next: () =>{
        window.location.reload();
      },
      error: (err) =>{
        console.log('Erro ao Deletar' + JSON.stringify(err));
        this.snackBar.open("Erro ao Deletar");
      }
    })
  }

  protected readonly DialogCreateCupomComponent = DialogCreateCupomComponent;
  protected readonly DialogCreateClienteComponent = DialogCreateClienteComponent;
}
