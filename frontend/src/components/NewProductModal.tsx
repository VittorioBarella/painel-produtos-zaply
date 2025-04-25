/**
 * Modal para criação de novos produtos.
 * Faz validação de campos e upload de imagem com preview.
 * Envia os dados via multipart/form-data para o backend.
 */
'use client'

import { useState } from 'react'
import { Product } from '@/types/Product'
import api from '@/services/api'

interface Props {
  onSave: (newProduct: Product) => void
  onClose: () => void
}

export default function NewProductModal({ onSave, onClose }: Props) {
  const [form, setForm] = useState({
    name: '',
    brand: '',
    categories: '',
    price: '',
    image: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target as HTMLInputElement & {
      files: FileList
    }

    if (name === 'price') {
      const regex = /^[0-9.,]*$/;
      if (!regex.test(value)) {
        setError('Insira apenas números e vírgulas.');
        return;
      }
      setError('');
      setForm(prev => ({ ...prev, price: value }));
    } else if (name === 'image' && files && files[0]) {
      const file = files[0]
      setImageFile(file)
      const imageUrl = URL.createObjectURL(file)
      setPreview(imageUrl)
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async () => {
    const priceFormatted = parseFloat(
      form.price.replace(/\./g, '').replace(',', '.')
    );

    if (!form.name || !form.brand || !form.categories || !imageFile || isNaN(priceFormatted) || priceFormatted <= 0) {
      setError('Preencha todos os campos corretamente.');
      return;
    }

    const formData = new FormData();
    formData.append('name', form.name);
    formData.append('brand', form.brand);
    formData.append('categories', form.categories);
    formData.append('price', priceFormatted.toString());
    formData.append('image', imageFile);

    try {
      const res = await api.post('/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      const normalizedProduct: Product = {
        ...res.data,
        price: parseFloat(res.data.price),
      };

      onSave(normalizedProduct);
      onClose();
    } catch (err) {
      console.error(err);
      setError('Erro ao salvar produto.');
    }
  };

  return (
    <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 rounded shadow" style={{ width: 400 }}>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0 text-dark">Novo Produto</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>

        {error && <div className="alert alert-danger py-2 px-3">{error}</div>}

        <label className="form-label text-dark fw-semibold">Nome</label>
        <input className="form-control mb-2" name="name" value={form.name} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Marca</label>
        <input className="form-control mb-2" name="brand" value={form.brand} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Categoria</label>
        <input className="form-control mb-2" name="categories" value={form.categories} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Preço</label>
        <input className="form-control mb-2" name="price" value={form.price} onChange={handleChange} />

        <label className="form-label text-dark fw-semibold">Imagem</label>
        <input type="file" accept="image/*" name="image" onChange={handleChange} className="form-control mb-3" />
        {preview && <img src={preview} alt="Preview" className="img-thumbnail mb-3" width={120} />}

        <div className="d-flex justify-content-end">
          <button className="btn btn-secondary me-2" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Salvar</button>
        </div>
      </div>
    </div>
  )
}
