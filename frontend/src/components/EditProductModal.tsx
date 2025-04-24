'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/Product'

interface Props {
  product: Product | null
  onSave: (updated: Product) => void
  onClose: () => void
}

export default function EditProductModal({ product, onSave, onClose }: Props) {
  const [form, setForm] = useState<Product | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (product) setForm(product)
  }, [product])

  if (!form) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: name === 'price' ? parseFloat(value) : value })
  }

  const isValidURL = (str: string) => {
    try {
      new URL(str)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = () => {
    if (!form.name || !form.brand || !form.categories || !form.image || form.price <= 0) {
      setError('Preencha todos os campos corretamente.')
      return
    }
    if (!isValidURL(form.image)) {
      setError('Informe uma URL válida para a imagem.')
      return
    }
    onSave(form)
    onClose()
  }

  return (
    <div className="modal show fade d-block" tabIndex={-1} role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Editar Produto</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger py-2 px-3">{error}</div>}

            <input type="text" name="name" className="form-control mb-2" placeholder="Nome"
              value={form.name} onChange={handleChange} />
            <input type="text" name="brand" className="form-control mb-2" placeholder="Marca"
              value={form.brand} onChange={handleChange} />
            <input type="text" name="categories" className="form-control mb-2" placeholder="Categoria"
              value={form.categories} onChange={handleChange} />
            <input type="number" name="price" className="form-control mb-2" placeholder="Preço"
              value={form.price} onChange={handleChange} />
            <input type="text" name="image" className="form-control mb-2" placeholder="URL da imagem"
              value={form.image} onChange={handleChange} />
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>Salvar</button>
          </div>
        </div>
      </div>
    </div>
  )
}
