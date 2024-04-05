import {Component, Inject} from '@angular/core';
import {AsyncPipe, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Bebida} from "../../../models/bebida";
import {BebidaService} from "../../../services/bebida.service";
import {MatButton} from "@angular/material/button";
import {ProdutoService} from "../../../services/produto.service";

@Component({
  selector: 'app-bebida-dialog',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule,
    MatAccordion,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatChipGrid,
    MatChipInput,
    MatChipRemove,
    MatChipRow,
    MatError,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatFormField,
    MatIcon,
    MatInput,
    MatLabel,
    MatOption,
    MatSelect,
    NgIf,
    ReactiveFormsModule,
    MatButton
  ],
  templateUrl: './bebida-dialog.component.html',
  styleUrl: './bebida-dialog.component.css'
})
export class BebidaDialogComponent {
  formGroup: FormGroup
  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) data: Bebida,
              private bebidaService: BebidaService,
              private produtoService: ProdutoService,
              protected dialogRef: MatDialogRef<BebidaDialogComponent>) {
    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
      nome: [(data && data.nome) ? data.nome : '', Validators.required],
      descricao: [(data && data.descricao) ? data.descricao : '', Validators.required],
      preco: [(data && data.preco) ? data.preco : '', Validators.required],
      kCal: [(data && data.kCal) ? data.kCal : '', Validators.required],
      ml: [(data && data.ml) ? data.ml : '', Validators.required],

    });

  }
  save(){
    if(this.formGroup.valid){
      const bebida = this.formGroup.value
      bebida["tipo"] = "BEBIDA"

      if(bebida.id == null){
        this.produtoService.create(bebida).subscribe({
          next: value => {
            this.dialogRef.close();
            window.location.reload()
          }
        });
      } else {
        this.produtoService.update(bebida).subscribe({
          next: value => {
            this.dialogRef.close();
            window.location.reload()
          }
        })
      }
    }
  }
}
