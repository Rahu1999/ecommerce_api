import { Schema, model, Document } from 'mongoose';

export interface IPayment extends Document {
  user: Schema.Types.ObjectId;
  order: Schema.Types.ObjectId;
  amount: number;
}

const paymentSchema = new Schema<IPayment>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  order: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  amount: { type: Number, required: true }
});

const Payment = model<IPayment>('Payment', paymentSchema);
export default Payment;
