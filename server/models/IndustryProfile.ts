import mongoose, { Document, Schema } from 'mongoose';

export interface IIndustryProfile extends Document {
  name: string;
  industryType: IndustryType;
  description?: string;
  userId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum IndustryType {
  MANUFACTURING = 'manufacturing',
  FOOD_PROCESSING = 'food_processing',
  TEXTILE = 'textile',
  CHEMICAL = 'chemical',
  ENERGY = 'energy',
  TRANSPORTATION = 'transportation',
  CONSTRUCTION = 'construction',
  OTHER = 'other'
}

const industryProfileSchema = new Schema<IIndustryProfile>({
  name: {
    type: String,
    required: [true, 'Industry name is required'],
    trim: true,
    maxlength: [100, 'Industry name cannot be more than 100 characters']
  },
  industryType: {
    type: String,
    enum: Object.values(IndustryType),
    required: [true, 'Industry type is required']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
    unique: true
  }
}, {
  timestamps: true
});

// Index for faster queries
industryProfileSchema.index({ userId: 1 });
industryProfileSchema.index({ industryType: 1 });

export const IndustryProfile = mongoose.model<IIndustryProfile>('IndustryProfile', industryProfileSchema);
