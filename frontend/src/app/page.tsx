// Este componente representa a página inicial do painel de produtos.
// Ele importa o componente `ProductTable` e fornece um array estático de produtos como exemplo.
// Cada produto possui informações como nome, imagem, preço, marca e categoria.
// Esses dados são passados como props para o `ProductTable`, que renderiza a tabela completa.
// Este setup funciona como um mock inicial, útil para desenvolvimento antes de conectar com backend ou API.

import ProductTable from "@/components/ProductTables";
import { Product } from "@/types/Product";

const produtos: Product[] = [
  {
    id: '1',
    name: 'Fone Bluetooth',
    image: 'https://placehold.co/50x50.png',
    price: 199.90,
    brand: 'Sony',
    categories: 'Áudio'
  },
  {
    id: '2',
    name: 'Smart TV 55',
    image: 'https://placehold.co/50x50.png',
    price: 3500.00,
    brand: 'Samsung',
    categories: 'TV'
  },
]

export default function HomePage() {
  return <ProductTable products={produtos}/>
}