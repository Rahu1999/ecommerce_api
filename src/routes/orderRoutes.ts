import { Router } from 'express';
import { createOrder, getOrders } from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);

export default router;
