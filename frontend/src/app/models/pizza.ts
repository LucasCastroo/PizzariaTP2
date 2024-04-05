import {Produto} from "./produto";
import {TamanhoPizza} from "./tamanho-pizza";
import {PorcaoPizza} from "./porcao-pizza";

export interface Pizza extends Produto {
  tamanhoPizza: TamanhoPizza;
  quantPorcoes: number;
  porcoes: PorcaoPizza[];
  pizzaPronta: boolean;
}
