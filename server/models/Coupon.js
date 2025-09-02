import mongoose from 'mongoose';

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true, trim: true },
  discountPercent: { type: Number, required: true, min: 1, max: 100 },
  active: { type: Boolean, default: true },
  expiresAt: { type: Date }
}, { timestamps: true });

export default mongoose.model('Coupon', couponSchema);
