'use client'

import { useState, useEffect } from 'react'
import axios from 'axios'
import { Product } from '@/types/Product'
import EditProductModal from './EditProductModal'
import NewProductModal from './NewProductModal'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FiMenu } from 'react-icons/fi'

export default function ProductTable() {
  const [search, setSearch] = useState('')
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showNewModal, setShowNewModal] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products')
        setProducts(res.data)
      } catch (err) {
        toast.error('Erro ao carregar os produtos.')
        console.error(err)
      }
    }
    fetchProducts()
  }, [])

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  const handleSave = async (updated: Product) => {
    try {
      await axios.put(`http://localhost:5000/api/products/${updated.id}`, updated)
      setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)))
      toast.success('Produto atualizado!')
    } catch (err) {
      toast.error('Erro ao atualizar produto.')
      console.error(err)
    }
  }

  const handleCreate = (newProd: Product) => {
    setProducts(prev => [...prev, newProd])
    toast.success('Produto criado com sucesso!')
  }

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm('Tem certeza que deseja excluir este produto?')
    if (!confirmDelete) return

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`)
      setProducts(prev => prev.filter(p => p.id !== id))
      toast.warn('Produto removido!')
    } catch (err) {
      toast.error('Erro ao excluir produto.')
      console.error(err)
    }
  }

  return (
    <main className="min-vh-100 bg-light py-5 px-3">
      <div className="mx-auto" style={{ maxWidth: 960 }}>
        <div className="bg-primary text-white rounded-top p-4 d-flex justify-content-between align-items-center">
          <h2 className="m-0">Painel de Produtos</h2>

          <button
            className="btn btn-light text-primary rounded-pill px-4 fw-bold d-none d-md-block"
            onClick={() => setShowNewModal(true)}
          >
            Novo Produto
          </button>

          <button
            className="btn btn-light text-primary d-block d-md-none"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            <FiMenu size={24} />
          </button>
        </div>

        {showMobileMenu && (
          <div className="bg-white text-center p-3 d-md-none">
            <button className="btn btn-primary w-100" onClick={() => {
              setShowNewModal(true)
              setShowMobileMenu(false)
            }}>
              Novo Produto
            </button>
          </div>
        )}

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
                      <img
                        src={`http://localhost:5000${prod.image || '/default.png'}`}
                        alt={prod.name}
                        width={50}
                        height={50}
                        className="rounded border"
                      />
                    </td>
                    <td className="fw-semibold">{prod.name}</td>
                    <td>
                      {Number(prod.price).toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </td>
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
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6zm2.5-.5a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5z" />
                            <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 1 1 0-2h3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1h3a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3a.5.5 0 0 0 0 1h11a.5.5 0 0 0 0-1h-11z" />
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
