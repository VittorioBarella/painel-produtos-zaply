/**
 * Interface que define a estrutura de um produto.
 * Utilizada para tipagem estática em componentes e requisições.
 * Ajuda na validação e autocompletar no TypeScript.
 */
export interface Product {
  id: string;
  name: string;
  image: string;
  price: number;
  brand: string;
  categories: string;
}