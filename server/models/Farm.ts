import mongoose, { Document, Schema } from 'mongoose';

export interface IFarm extends Document {
  name: string;
  location: string;
  size: number; // in acres
  description?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const farmSchema = new Schema<IFarm>({
  name: {
    type: String,
    required: [true, 'Farm name is required'],
    trim: true,
    maxlength: [100, 'Farm name cannot be more than 100 characters']
  },
  location: {
    type: String,
    required: [true, 'Location is required'],
    trim: true
  },
  size: {
    type: Number,
    required: [true, 'Farm size is required'],
    min: [0.1, 'Farm size must be at least 0.1 acres']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required']
  }
}, {
  timestamps: true
});

// Index for faster queries
farmSchema.index({ userId: 1 });
farmSchema.index({ location: 1 });

export const Farm = mongoose.model<IFarm>('Farm', farmSchema);
