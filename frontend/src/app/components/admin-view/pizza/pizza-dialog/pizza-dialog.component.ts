import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MatCard, MatCardActions, MatCardContent} from "@angular/material/card";
import {FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AsyncPipe, NgIf} from "@angular/common";
import {MatOption, MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatButton} from "@angular/material/button";
import {
  MatAccordion,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "@angular/material/expansion";
import {MatChipGrid, MatChipInput, MatChipRemove, MatChipRow} from "@angular/material/chips";
import {MatIcon} from "@angular/material/icon";
import {MatAutocomplete, MatAutocompleteSelectedEvent, MatAutocompleteTrigger} from "@angular/material/autocomplete";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {debounceTime, distinctUntilChanged, Observable, startWith, switchMap} from "rxjs";
import {PorcaoPizza} from "../../../../models/porcao-pizza";
import {Ingrediente} from "../../../../models/ingrediente";
import {Pizza, TamanhoPizza} from "../../../../models/pizza";
import {IngredienteService} from "../../../../services/ingrediente.service";
import {ProdutoService} from "../../../../services/produto.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
    AsyncPipe,
    MatButton
  ],
  templateUrl: './pizza-dialog.component.html',
  styleUrl: './pizza-dialog.component.css'
})
export class PizzaDialogComponent {
  formGroup: FormGroup
  tamanhosPizza: string[]
  porcoes: PorcaoPizza[] = []
  separatorKeysCodes: number[] = [ENTER, COMMA];
  ingredienteCtrl = new FormControl("");
  filteredIngredientes: Observable<Ingrediente[]>;
  @ViewChild('ingredienteInput') ingredienteInput: ElementRef<HTMLInputElement> | undefined;

  constructor(private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) data: Pizza,
              private ingredienteService: IngredienteService,
              protected dialogRef: MatDialogRef<PizzaDialogComponent>,
              private produtoService: ProdutoService,
              protected snackBar: MatSnackBar) {
    this.tamanhosPizza = Object.keys(TamanhoPizza).filter(x => isNaN(parseInt(x)))
    if(data != null) this.porcoes = data.porcoes;
    this.formGroup = formBuilder.group({
      id: [(data && data.id) ? data.id : null],
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

  selected(porcao: PorcaoPizza, event: MatAutocompleteSelectedEvent){
    porcao.ingredientes.push(event.option.value);
    this.ingredienteInput ? this.ingredienteInput.nativeElement.value = '' : undefined;
    this.ingredienteCtrl.setValue(null);
  }

  save(){
    if(this.formGroup.valid){
      const pizza = this.formGroup.value
      pizza["tipo"] = "PIZZA"
      pizza.porcoes = []
      this.porcoes.forEach(p =>{
        pizza.porcoes.push({idIngredientes: p.ingredientes.map(i => i.id)})
      })
      console.log(pizza)
      if(pizza.id == null){
        this.produtoService.create(pizza).subscribe({
          next: value => {
            this.dialogRef.close();
            window.location.reload();
            },
          error: err => {
            this.showSnackBarBottomPosition('Erro ao Criar Pizza!', '', 3000);
          }
        });
      }else {
        this.produtoService.update(pizza).subscribe({
          next: value => {
            this.dialogRef.close();
            window.location.reload();
          },
          error: err => {
            this.showSnackBarBottomPosition('Erro ao Editar Pizza!', '', 3000);
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
