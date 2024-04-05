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
import {DialogCupomComponent} from "./dialog-cupom/dialog-cupom.component";
import {MatDrawer, MatDrawerContainer} from "@angular/material/sidenav";
import {Router, RouterLink} from "@angular/router";
import {DialogDeleteComponent} from "./dialog-delete/dialog-delete.component";


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

  constructor(private service: CupomService, public dialog: MatDialog, protected snackBar: MatSnackBar, private router: Router){}

  ngOnInit() {
    this.service.findAll().subscribe(data =>{
      this.cupons = data.sort((a, b) => a.id - b.id);
    })
  }

  logout() {
    this.router.navigateByUrl('/login');
  }

  protected readonly DialogCupomComponent = DialogCupomComponent;
  protected readonly DialogDeleteComponent = DialogDeleteComponent;
}
