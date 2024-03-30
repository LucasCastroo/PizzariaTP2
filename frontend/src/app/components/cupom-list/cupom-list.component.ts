import {Component, OnInit} from '@angular/core';
import {Cupom} from "../../models/cupom";
import {CupomService} from "../../services/cupom.service";
import { NgFor } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {CupomFormComponent} from "../cupom-form/cupom-form.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-cupom-list',
  standalone: true,
  imports: [NgFor, MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './cupom-list.component.html',
  styleUrl: './cupom-list.component.css'
})
export class CupomListComponent implements OnInit{
  displayedColumns = ["id", "codigo", "desconto", "acao"];
  cupons: Cupom[] = []

  constructor(private service: CupomService, protected dialog: MatDialog, protected snackBar: MatSnackBar){}

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

  protected readonly CupomFormComponent = CupomFormComponent;
}
