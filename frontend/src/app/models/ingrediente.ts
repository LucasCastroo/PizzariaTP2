import {CategoriaIngrediente} from "./categoria-ingrediente";

export interface Ingrediente {
  id: number,
  nome: string,
  categoria: CategoriaIngrediente,
  preco: number
}
