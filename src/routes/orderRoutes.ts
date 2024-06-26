import { Router } from 'express';
import { createOrder, fetchLogistics, getOrders, paymentRequest } from '../controllers/orderController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.post('/', authMiddleware, createOrder);
router.get('/', authMiddleware, getOrders);
router.post('/create', authMiddleware, paymentRequest);// Create order with mock payment getaway
router.get('/ship', authMiddleware, fetchLogistics);

export default router;
