import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {CupomService} from "../../../../services/cupom.service";
import {Cupom} from "../../../../models/cupom";

@Component({
  selector: 'app-dialog-create-cupom',
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
    ReactiveFormsModule
  ],
  templateUrl: './cupom-dialog.component.html',
  styleUrl: './cupom-dialog.component.css'
})
export class CupomDialogComponent {
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: CupomService,
              @Inject(MAT_DIALOG_DATA) data: Cupom,
              protected dialogRef: MatDialogRef<CupomDialogComponent>,
              protected snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      codigo: [(data && data.codigo) ? data.codigo : '', Validators.required],
      desconto: [(data && data.desconto) ? data.desconto : '', Validators.required]
    });
  }

  save(){
    if(this.formGroup.valid){
      const cupom = this.formGroup.value;
      if (cupom.id ==null) {
        this.service.create(cupom).subscribe({
          next: (cupomCadastrado) => {
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            console.log('Erro ao Criar' + JSON.stringify(err));
            this.showSnackBarBottomPosition('Erro ao Criar Cupom!', '', 3000);
          }
        });
      } else {
        this.service.update(cupom.id, cupom).subscribe({
          next: (cupomAlterado) => {
            this.dialogRef.close();
            window.location.reload();
          },
          error: (err) => {
            console.log('Erro ao Editar' + JSON.stringify(err));
            this.showSnackBarBottomPosition('Erro ao Editar Cupom!', '', 3000);
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
