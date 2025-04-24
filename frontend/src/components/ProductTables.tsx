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
import { v4 as uuidv4 } from 'uuid'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface Props {
  products: Product[]
}

export default function ProductTable({ products: initialProducts }: Props) {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = (updated: Product) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)))
    toast.success('Produto atualizado!')
  }

  const handleCreate = (newProd: Omit<Product, 'id'>) => {
    const productWithId = { ...newProd, id: uuidv4() }
    setProducts(prev => [...prev, productWithId])
    toast.success('Produto criado com sucesso!')
  }

  const handleDelete = (id: string) => {
    const confirmDelete = confirm('Tem certeza que deseja excluir este produto?')
    if (confirmDelete) {
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.warn('Produto removido!')
    }
  }

  return (
    <main className="min-vh-100 bg-light py-5 px-3">
      <div className="mx-auto" style={{ maxWidth: 960 }}>
        <div className="bg-primary text-white rounded-top p-4 d-flex justify-content-between align-items-center">
          <h2 className="m-0">Painel de Produtos</h2>
          <button
            className="btn btn-light text-primary rounded-pill px-4 fw-bold"
            onClick={() => setShowNewModal(true)}
          >
            Novo Produto
          </button>
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
                      <div className="d-flex align-items-center gap-2">
                        <button
                          className="btn btn-primary btn-sm rounded-pill px-3"
                          onClick={() => setSelectedProduct(prod)}
                        >
                          Editar
                        </button>
                        <button
                          className="btn btn-danger btn-sm rounded-circle d-flex align-items-center justify-content-center"
                          style={{ width: 32, height: 32 }}
                          onClick={() => handleDelete(prod.id)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm2.5-.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z"/>
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 1 1 0-2h3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <EditProductModal
          product={selectedProduct}
          onSave={handleSave}
          onClose={() => setSelectedProduct(null)}
        />
      )}

      {showNewModal && (
        <NewProductModal
          onSave={handleCreate}
          onClose={() => setShowNewModal(false)}
        />
      )}

      <ToastContainer position="top-right" autoClose={3000} />
    </main>
  )
}
