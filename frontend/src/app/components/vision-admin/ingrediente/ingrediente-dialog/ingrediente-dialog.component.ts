import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {IngredienteService} from "../../../../services/ingrediente.service";
import {Ingrediente} from "../../../../models/ingrediente";
import {CategoriaIngrediente} from "../../../../models/categoria-ingrediente";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-ingrediente-dialog',
  standalone: true,
  imports: [
    FormsModule,
    MatButton,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    NgIf,
    ReactiveFormsModule,
    MatOption,
    MatSelect
  ],
  templateUrl: './ingrediente-dialog.component.html',
  styleUrl: './ingrediente-dialog.component.css'
})
export class IngredienteDialogComponent {
  categorias: string[];
  formGroup: FormGroup

  constructor(private formBuilder: FormBuilder,
              private service: IngredienteService,
              @Inject(MAT_DIALOG_DATA) data: Ingrediente,
              protected dialogRef: MatDialogRef<IngredienteDialogComponent>,
              protected snackBar: MatSnackBar) {
    this.categorias = Object.keys(CategoriaIngrediente).filter(x => isNaN(parseInt(x)))
    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      nome: [(data && data.nome) ? data.nome : '', Validators.required],
      preco: [(data && data.preco) ? data.preco : '', Validators.required],
      categoria: [(data && data.categoria) ? data.categoria : '', Validators.required],
    });
  }

  save(){
    if(this.formGroup.valid){
      const ingrediente = this.formGroup.value
      if(ingrediente.id == null){
        this.service.create(ingrediente).subscribe({
          next: value => {
            this.dialogRef.close();
            window.location.reload()
          }, error: (err) => {
            console.log('Erro ao Criar' + JSON.stringify(err));
            this.showSnackBarBottomPosition('Erro ao Criar Ingrediente!', '', 3000);
          }
        });
      }else {
        this.service.update(ingrediente).subscribe({
          next: value => {
            this.dialogRef.close();
            window.location.reload()
          }, error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
            this.showSnackBarBottomPosition('Erro ao Editar Ingrediente!', '', 3000);
          }
        });
      }
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
