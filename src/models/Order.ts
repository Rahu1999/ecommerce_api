import { Schema, model, Document } from 'mongoose';

export interface IOrder extends Document {
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  quantity: number;
  total: number;
  isPaid:Boolean;
}

const orderSchema = new Schema<IOrder>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  total: { type: Number, required: true },
  isPaid: {type:Boolean,default:false}
});

const Order = model<IOrder>('Order', orderSchema);
export default Order;
