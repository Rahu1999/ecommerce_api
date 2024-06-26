import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './utils/db';
import userRoutes from './routes/userRoutes';
import productRoutes from './routes/productRoutes';
import orderRoutes from './routes/orderRoutes';
import errorHandlingMiddleWare from './middleware/error.handler';
import limiter from './middleware/rate-limiter';
import nock from 'nock';
// Mock Stripe API
nock('https://api.stripe.com')
  .post('/v1/charges')
  .reply(200, {
    id: 'eZvKYlo2C5g6sm7H5',
    amount: 2000,
    currency: 'inr',
    isPaid: true,
});

// Mock Logistics API
nock('https://api.logistics.com')
  .get('/v1/shipments')
  .reply(200, {
    id: '_1234567890',
    isCompleted: true,
    status: 'shipped',
  });


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
connectDB();
// Middleware to log HTTP requests
app.use(morgan('dev'));
// Middleware to enable CORS
app.use(cors());
// Rate Limiter Middleware
app.use(limiter); 

app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.use(errorHandlingMiddleWare);
app.use('*', (req, res) => {
  res.status(404).json({ status: 404, error: "Resource not found" });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
