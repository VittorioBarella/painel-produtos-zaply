'use client'

import { useEffect, useState } from 'react'
import { Product } from '@/types/Product'

interface Props {
  product: Product | null
  onSave: (updated: Product) => void
  onClose: () => void
}

interface ProductForm {
  id: string
  name: string
  brand: string
  categories: string
  price: string 
  image: string
}

export default function EditProductModal({ product, onSave, onClose }: Props) {
  const [form, setForm] = useState<ProductForm | null>(null)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState('')
  const [newImage, setNewImage] = useState<File | null>(null)

  useEffect(() => {
    if (product) {
      setForm({
        ...product,
        price: product.price.toString().replace('.', ',') 
      })
      setPreview(`http://localhost:5000${product.image}`)
    }
  }, [product])

  if (!form) return null

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target

    if (name === 'price') {
      const regex = /^[0-9.,]*$/
      if (!regex.test(value)) {
        setError('Insira somente números e vírgulas.')
        return
      }
      setError('')
      setForm({ ...form, price: value })
    } else if (name === 'image' && files?.[0]) {
      const file = files[0]
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
      setNewImage(file)
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async () => {
    if (!form.name || !form.brand || !form.categories || !form.price) {
      setError('Preencha todos os campos corretamente.')
      return
    }

    const parsedPrice = parseFloat(form.price.replace(',', '.'))
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      setError('Preço inválido.')
      return
    }

    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('brand', form.brand)
    formData.append('categories', form.categories)
    formData.append('price', parsedPrice.toString())
    if (newImage) {
      formData.append('image', newImage)
    }

    try {
      const res = await fetch(`http://localhost:5000/api/products/${form.id}`, {
        method: 'PUT',
        body: formData
      })
      const data = await res.json()
      onSave(data)
      onClose()
    } catch (err) {
      console.error(err)
      setError('Erro ao atualizar produto.')
    }
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

            <input type="text" name="name" className="form-control mb-2" placeholder="Nome" value={form.name} onChange={handleChange} />
            <input type="text" name="brand" className="form-control mb-2" placeholder="Marca" value={form.brand} onChange={handleChange} />
            <input type="text" name="categories" className="form-control mb-2" placeholder="Categoria" value={form.categories} onChange={handleChange} />
            <input type="text" name="price" className="form-control mb-2" placeholder="Preço" value={form.price} onChange={handleChange} />

            <label className="form-label fw-semibold text-dark">Imagem do produto</label>
            <input type="file" name="image" accept="image/*" className="form-control mb-2" onChange={handleChange} />

            {preview && (
              <img
                src={preview}
                alt="Preview"
                className="img-fluid rounded border mb-3"
                style={{ maxHeight: 160, objectFit: 'contain' }}
              />
            )}
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
