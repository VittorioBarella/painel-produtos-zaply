/**
 * Controller responsável pelas operações CRUD de produtos.
 * Inclui lógica para manipulação de imagens (upload, exclusão).
 * Utiliza banco PostgreSQL com UUID como chave primária.
 */

import db from '../models/db.js';
import fs from 'fs';
import path from 'path';

// Busca todos os produtos
export const getAllProducts = async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM products ORDER BY name');
    res.status(200).json(result.rows);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao buscar produtos', details: error.message });
  }
};

// Cria novo produto
export const createProduct = async (req, res) => {
  try {
    const { name, brand, categories, price } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const numericPrice = parseFloat(
      price?.toString().replace(/\./g, '').replace(',', '.'),
    );

    if (!name || !brand || !categories || isNaN(numericPrice) || !image) {
      return res
        .status(400)
        .json({ error: 'Todos os campos são obrigatórios.' });
    }

    const newProduct = await db.query(
      'INSERT INTO products (id, name, brand, categories, price, image) VALUES (gen_random_uuid(), $1, $2, $3, $4, $5) RETURNING *',
      [name, brand, categories, numericPrice, image],
    );

    res.status(201).json(newProduct.rows[0]);
  } catch (error) {
    console.error('Erro ao criar produto:', error);
    res.status(500).json({ error: 'Erro ao criar produto.' });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, brand, categories, price } = req.body;
  const newImage = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    // Busca o produto atual para pegar o caminho da imagem antiga
    const existing = await db.query(
      'SELECT image FROM products WHERE id = $1',
      [id],
    );
    if (existing.rows.length === 0) {
      return res.status(404).json({ error: 'Produto não encontrado.' });
    }

    let image = existing.rows[0].image;

    // Se tiver uma nova imagem, remove a antiga e atualiza o caminho
    if (newImage) {
      if (image) {
        const imagePath = path.join(process.cwd(), 'public', image);
        if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
      }
      image = newImage;
    }

    // Atualiza o produto
    const updated = await db.query(
      'UPDATE products SET name = $1, brand = $2, categories = $3, price = $4, image = $5 WHERE id = $6 RETURNING *',
      [name, brand, categories, price, image, id],
    );

    res.status(200).json(updated.rows[0]);
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    res
      .status(500)
      .json({ error: 'Erro ao atualizar produto', details: error.message });
  }
};

// Remove produto
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    // Busca imagem atual
    const result = await db.query('SELECT image FROM products WHERE id = $1', [
      id,
    ]);
    const product = result.rows[0];

    if (product?.image) {
      const imagePath = path.join(process.cwd(), 'public', product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await db.query('DELETE FROM products WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Erro ao remover produto', details: error.message });
  }
};
