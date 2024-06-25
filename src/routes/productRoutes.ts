import { Router } from 'express';
import { createProduct, getProducts } from '../controllers/productController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createProduct);
router.get('/', getProducts);

export default router;
