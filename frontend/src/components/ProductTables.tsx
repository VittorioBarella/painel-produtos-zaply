// Este componente exibe um painel de produtos com visual moderno, responsivo e funcional.
// Ele recebe uma lista de produtos via props e permite ao usuário filtrar os itens por nome ou marca.
// Cada produto é exibido em uma tabela com imagem, nome, preço, marca, categoria e botão de edição.
// A busca é feita com um campo controlado (useState) e o layout utiliza classes do Bootstrap.
// O componente utiliza <Image> do Next.js para otimização automática das imagens.
'use client'

import { useState } from 'react'
import { Product } from '@/types/Product'
import Image from 'next/image'
import EditProductModal from './EditProductModal'
import NewProductModal from './NewProductModal'
import { v4 as uuidv4} from 'uuid'


interface Props {
  products: Product[]
}

export default function ProductTable({ products:initalProducts }: Props) {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>(initalProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null> (null)
  const [showNewModal, setShowNewModal] = useState(false)


  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)))
  }

  const handleCreate = (newProd: Omit<Product, 'id'>) => {
    const productWithId = { ...newProd, id: uuidv4()}
    setProducts(prev => [ ...prev, productWithId])
  }

  return (
    <main className="min-vh-100 bg-light py-5 px-3">
      <div className="mx-auto" style={{ maxWidth: 960 }}>
        <div className="bg-primary text-white rounded-top p-4 d-flex justify-content-between align-items-center">
          <h2 className="m-0">Painel de Produtos</h2>
          <button className="btn btn-light text-primary rounded-pill px-4 fw-bold" onClick={() => setShowNewModal(true)}>Novo Produto</button>
        </div>

        <div className="bg-white rounded-bottom shadow-sm p-4">
          <input
            className="form-control mb-4 rounded-pill px-4 py-2"
            placeholder="Buscar produto ou marca..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />

          <div className="table-responsive">
            <table className="table align-middle">
              <thead>
                <tr>
                  <th>Imagem</th>
                  <th>Nome</th>
                  <th>Preço</th>
                  <th>Marca</th>
                  <th>Categoria</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(prod => (
                  <tr key={prod.id}>
                    <td>
                      <Image
                        src={prod.image}
                        alt={prod.name}
                        width={50}
                        height={50}
                        className="rounded border"
                      />
                    </td>
                    <td className="fw-semibold">{prod.name}</td>
                    <td>R$ {prod.price.toFixed(2)}</td>
                    <td>{prod.brand}</td>
                    <td>{prod.categories}</td>
                    <td>
                      <button className="btn btn-primary btn-sm rounded-pill px-3"
                      onClick={() => setSelectedProduct(prod)}>Editar</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {/*Esta é a modal de edição de produto.*/ }
      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {/*Esta é a modal de criação de produto.*/ }
      {showNewModal && (
        <NewProductModal
          onSave={handleCreate}
          onClose={() => setShowNewModal(false)}
        />
      )}
    </main>
  )
}