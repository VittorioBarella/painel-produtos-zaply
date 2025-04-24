import express from 'express';
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productsControllers.js';
import upload from '../middlewares/uploadMiddleware.js';
import db from '../models/db.js';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', upload.single('image'), createProduct);
router.put('/:id', upload.single('image'), updateProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

// Rota de teste para inserção no Railway com UUID
router.post('/test-insert', async (req, res) => {
  try {
    const id = uuidv4();

    const result = await db.query(
      `INSERT INTO products (id, name, image, price, brand, categories)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [
        id,
        'Produto Teste',
        '/default.png',
        99.99,
        'Marca Teste',
        'Categoria Teste',
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Erro ao inserir produto teste:', error);
    res.status(500).json({ error: 'Erro ao inserir produto de teste' });
  }
});

export default router;
