import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PizzaService} from "../../../../services/pizza.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {NgIf} from "@angular/common";
import {BebidaService} from "../../../../services/bebida.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-imagem-upload-dialog',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './imagem-upload-dialog.component.html',
  styleUrls: ['./imagem-upload-dialog.component.css']
})
export class ImagemUploadDialogComponent {
  file: File | undefined;

  constructor(
    public dialogRef: MatDialogRef<ImagemUploadDialogComponent>,
    private servicePizza: PizzaService,
    protected snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) protected id: number,
    private serviceBebida: BebidaService,
    private router: Router
  ) {}

  onChange(file: File | undefined) {
    this.file = file;
  }

  salvarImagem() {
    const currentUrl = this.router.url;

    if (this.file !== undefined) {
      if (currentUrl.includes('/pizza')) {
        this.servicePizza.uploadImage(this.file, this.id).subscribe({
          next: (r) => {
            this.showSnackBarBottomPosition('Imagem atualizada com sucesso!', '', 3000);
            this.dialogRef.close();
            window.location.reload();
          },
          error: (e) => {
            this.showSnackBarBottomPosition('Erro ao atualizar imagem ' + e, '', 3000);
          }
        });
      } else if (currentUrl.includes('/bebida')) {
        this.serviceBebida.uploadImage(this.file, this.id).subscribe({
          next: (r) => {
            this.showSnackBarBottomPosition('Imagem atualizada com sucesso!', '', 3000);
            this.dialogRef.close();
            window.location.reload();
          },
          error: (e) => {
            this.showSnackBarBottomPosition('Erro ao atualizar imagem ' + e, '', 3000);
          }
        });
      } else {
        this.showSnackBarBottomPosition('URL inválida', '', 3000);
      }
    } else {
      this.showSnackBarBottomPosition('Selecione um arquivo de imagem', '', 3000);
    }
  }

  showSnackBarBottomPosition(content: any, action: any, duration: any) {
    this.snackBar.open(content, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'center',
    });
  }
}
