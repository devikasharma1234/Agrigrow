import mongoose, { Document, Schema } from 'mongoose';

export interface ICarbonCredit extends Document {
  amount: number; // in tons of CO2
  price: number; // price per ton
  status: CreditStatus;
  farmId?: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  industryId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum CreditStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  SOLD = 'sold',
  CANCELLED = 'cancelled'
}

const carbonCreditSchema = new Schema<ICarbonCredit>({
  amount: {
    type: Number,
    required: [true, 'Amount is required'],
    min: [0.1, 'Amount must be at least 0.1 tons']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  status: {
    type: String,
    enum: Object.values(CreditStatus),
    default: CreditStatus.PENDING
  },
  farmId: {
    type: Schema.Types.ObjectId,
    ref: 'Farm'
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  },
  industryId: {
    type: Schema.Types.ObjectId,
    ref: 'IndustryProfile'
  }
}, {
  timestamps: true
});

// Index for faster queries
carbonCreditSchema.index({ userId: 1 });
carbonCreditSchema.index({ farmId: 1 });
carbonCreditSchema.index({ status: 1 });
carbonCreditSchema.index({ industryId: 1 });

export const CarbonCredit = mongoose.model<ICarbonCredit>('CarbonCredit', carbonCreditSchema);
