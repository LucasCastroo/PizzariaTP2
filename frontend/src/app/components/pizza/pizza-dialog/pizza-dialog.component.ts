import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {NivelAcesso} from "../../../models/nivel-acesso";
import {TamanhoPizza} from "../../../models/tamanho-pizza";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Funcionario} from "../../../models/funcionario";
import {Pizza} from "../../../models/pizza";
import {MatButton} from "@angular/material/button";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelDescription, MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {PorcaoPizza} from "../../../models/porcao-pizza";
import {MatChipGrid, MatChipInput, MatChipInputEvent, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {Ingrediente} from "../../../models/ingrediente";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {debounceTime, distinctUntilChanged, Observable, startWith, switchMap} from "rxjs";
import {IngredienteService} from "../../../services/ingrediente.service";
import {PorcaoPizzaService} from "../../../services/porcao-pizza.service";

@Component({
  selector: 'app-pizza-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
    NgIf,
    MatSelect,
    MatOption,
    MatLabel,
    FormsModule,
    MatCardActions,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelTitle,
    MatExpansionPanelHeader,
    MatChipGrid,
    MatChipRow,
    MatChipRemove,
    MatIcon,
    MatChipInput,
    MatAutocompleteTrigger,
    MatAutocomplete,
    AsyncPipe
  ],
  templateUrl: './pizza-dialog.component.html',
  styleUrl: './pizza-dialog.component.css'
})
export class PizzaDialogComponent {
  formGroup: FormGroup
  tamanhosPizza: string[]
  porcoes: PorcaoPizza[]
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredienteCtrl = new FormControl("");
  filteredIngredientes: Observable<Ingrediente[]>;
  @ViewChild('ingredienteInput') ingredienteInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) data: Pizza,
              private ingredienteService: IngredienteService,
              protected dialogRef: MatDialogRef<PizzaDialogComponent>,
              private porcaoPizzaService: PorcaoPizzaService) {
    this.tamanhosPizza = Object.keys(TamanhoPizza).filter(x => isNaN(parseInt(x)))
    this.porcoes = data.porcoes;
    this.formGroup = formBuilder.group({
      nome: [(data && data.nome) ? data.nome : '', Validators.required],
      descricao: [(data && data.descricao) ? data.descricao : '', Validators.required],
      preco: [(data && data.preco) ? data.preco : '', Validators.required],
      kCal: [(data && data.kCal) ? data.kCal : '', Validators.required],
      tamanhoPizza: [(data && data.tamanhoPizza) ? data.tamanhoPizza : '', Validators.required],

    });
    this.filteredIngredientes = this.ingredienteCtrl.valueChanges.pipe(
      startWith(""),
      debounceTime(400),
      distinctUntilChanged(),
      switchMap((val) => {
        return ingredienteService.search(val || '')
      })
    )
  }

  remove(porcao: PorcaoPizza, ingrediente: Ingrediente){
    const idx = porcao.ingredientes.indexOf(ingrediente);
    if(idx >= 0){
      porcao.ingredientes.splice(idx, 1);
    }
    console.log(ingrediente.id)
  }

  add(porcao: PorcaoPizza, event: MatChipInputEvent){
    const value = (event.value || '').trim();

  }

  selected(porcao: PorcaoPizza, event: MatAutocompleteSelectedEvent){
    console.log("opa")
    this.porcaoPizzaService.addIngrediente(porcao.id.toString(), event.option.value).subscribe(

    );
    this.ingredienteInput ? this.ingredienteInput.nativeElement.value = '' : undefined;
    this.ingredienteCtrl.setValue(null);
  }
}
