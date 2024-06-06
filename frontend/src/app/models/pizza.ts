import {Produto} from "./produto";
import {PorcaoPizza} from "./porcao-pizza";

export interface Pizza extends Produto {
  tamanhoPizza: TamanhoPizza;
  quantPorcoes: number;
  porcoes: PorcaoPizza[];
  pizzaPronta: boolean;
}

export enum TamanhoPizza {
  PEQUENA,
  MEDIA,
  GRANDE,
  GIGA
}

export function formatTamanhoPizza(tamanhoPizza: TamanhoPizza): string {
  switch (tamanhoPizza.toString()){
    case "PEQUENA":
      return "Pequena"
    case "MEDIA":
      return "Média"
    case "GRANDE":
      return "Grande"
    case "GIGA":
      return "Giga"
  }
  return ""
}
