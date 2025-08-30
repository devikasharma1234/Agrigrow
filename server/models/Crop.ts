import mongoose, { Document, Schema } from 'mongoose';

export interface ICrop extends Document {
  name: string;
  type: CropType;
  variety?: string;
  plantingDate: Date;
  harvestDate?: Date;
  yield?: number; // in tons
  farmId: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export enum CropType {
  WHEAT = 'wheat',
  CORN = 'corn',
  SOYBEANS = 'soybeans',
  COTTON = 'cotton',
  RICE = 'rice',
  SUGARCANE = 'sugarcane',
  COFFEE = 'coffee',
  TEA = 'tea',
  FRUITS = 'fruits',
  VEGETABLES = 'vegetables',
  OTHER = 'other'
}

const cropSchema = new Schema<ICrop>({
  name: {
    type: String,
    required: [true, 'Crop name is required'],
    trim: true,
    maxlength: [50, 'Crop name cannot be more than 50 characters']
  },
  type: {
    type: String,
    enum: Object.values(CropType),
    required: [true, 'Crop type is required']
  },
  variety: {
    type: String,
    trim: true,
    maxlength: [50, 'Variety cannot be more than 50 characters']
  },
  plantingDate: {
    type: Date,
    required: [true, 'Planting date is required']
  },
  harvestDate: {
    type: Date
  },
  yield: {
    type: Number,
    min: [0, 'Yield cannot be negative']
  },
  farmId: {
    type: Schema.Types.ObjectId,
    ref: 'Farm',
    required: [true, 'Farm ID is required']
  }
}, {
  timestamps: true
});

// Index for faster queries
cropSchema.index({ farmId: 1 });
cropSchema.index({ type: 1 });
cropSchema.index({ plantingDate: 1 });

export const Crop = mongoose.model<ICrop>('Crop', cropSchema);
