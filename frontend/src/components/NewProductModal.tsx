'use client'

import { useState } from 'react'
import { Product } from '@/types/Product'
import { v4 as uuidv4 } from 'uuid'

interface Props {
  onSave: (newProduct: Product) => void
  onClose: () => void
}

export default function NewProductModal({ onSave, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    categories: '',
    price: 0,
    image: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: name === 'price' ? parseFloat(value) : value }))
  }

  const handleSubmit = () => {
    const newProduct: Product = {
      id: uuidv4(),
      ...form
    }
    onSave(newProduct)
    onClose()
  }

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 rounded shadow" style={{ width: 400 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0 text-dark">Novo Produto</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        <label className="form-label text-dark fw-semibold">Nome</label>
        <input className="form-control mb-2" placeholder="Adicione seu nome" name="name" value={form.name} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Marca</label>
        <input className="form-control mb-2" placeholder="Adicione a marca" name="brand" value={form.brand} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Categoria</label>
        <input className="form-control mb-2" placeholder="Diga a qual categoria pertence" name="categories" value={form.categories} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold mt-2">Preço:</label>
        <input className="form-control mb-2" placeholder="Preço" name="price" type="number" value={form.price} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">URL da imagem</label>
        <input className="form-control mb-3" placeholder="Cole aqui a URL da imagem" name="image" value={form.image} onChange={handleChange} />

        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
