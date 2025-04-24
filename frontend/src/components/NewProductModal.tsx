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

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value 
    }))
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

        {error && <div className="alert alert-danger py-2 px-3">{error}</div>}

        <label className="form-label text-dark fw-semibold">Nome</label>
        <input className="form-control mb-2" placeholder="Nome do produto" name="name" value={form.name} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Marca</label>
        <input className="form-control mb-2" placeholder="Marca do produto" name="brand" value={form.brand} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Categoria</label>
        <input className="form-control mb-2" placeholder="Categoria do produto" name="categories" value={form.categories} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Preço</label>
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
