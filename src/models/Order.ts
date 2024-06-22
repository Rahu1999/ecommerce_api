import { Schema, model, Document } from 'mongoose';

interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  products: { product: Schema.Types.ObjectId, quantity: number }[];
  totalAmount: number;
  status: string;
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
});

const Order = model<IOrder>('Order', orderSchema);
export default Order;
