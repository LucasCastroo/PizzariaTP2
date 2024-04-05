import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Cupom} from "../../../models/cupom";
import {CupomService} from "../../../services/cupom.service";
import {ActivatedRoute} from "@angular/router";

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
  templateUrl: './dialog-cupom.component.html',
  styleUrl: './dialog-cupom.component.css'
})
export class DialogCupomComponent {
  durationInSecond = 5;
  formGroup: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private service: CupomService,
              @Inject(MAT_DIALOG_DATA) data: Cupom,
              protected dialogRef: MatDialogRef<DialogCupomComponent>,
              protected snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute) {

    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      codigo: [(data && data.codigo) ? data.codigo : '', Validators.required],
      desconto: [(data && data.desconto) ? data.desconto : '', Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
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
            this.snackBar.open("Erro ao Criar");
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
            this.snackBar.open("Erro ao Editar");

          }
        });
      }
    }
  }
}
