import {Component, Inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {CupomService} from "../../services/cupom.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Cupom} from "../../models/cupom";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-cupom-form',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, MatFormFieldModule,
    MatInputModule, MatButtonModule, MatCardModule],
  templateUrl: './cupom-form.component.html',
  styleUrl: './cupom-form.component.css'
})
export class CupomFormComponent {
  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private service: CupomService,
              @Inject(MAT_DIALOG_DATA) data: Cupom,
              protected dialogRef: MatDialogRef<CupomFormComponent>,
              protected snackBar: MatSnackBar) {

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
