import {Produto} from "./produto";
import {TamanhoPizza} from "./tamanho-pizza";

export interface Pizza extends Produto {
  tamanhoPizza: TamanhoPizza
  quantPorcoes: number,
  pizzaPronta: boolean
}
