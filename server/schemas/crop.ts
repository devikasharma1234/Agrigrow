import { z } from 'zod';

const cropTypes = ['wheat', 'corn', 'soybeans', 'cotton', 'rice', 'sugarcane', 'coffee', 'tea', 'fruits', 'vegetables', 'other'] as const;

export const createCropSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Crop name must be at least 2 characters').max(50, 'Crop name cannot exceed 50 characters'),
    type: z.enum(cropTypes, {
      errorMap: () => ({ message: 'Invalid crop type' })
    }),
    variety: z.string().max(50, 'Variety cannot exceed 50 characters').optional(),
    plantingDate: z.string().datetime('Invalid planting date format'),
    harvestDate: z.string().datetime('Invalid harvest date format').optional(),
    yield: z.number().positive('Yield must be positive').optional(),
    farmId: z.string().min(1, 'Farm ID is required')
  })
});

export const updateCropSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Crop ID is required')
  }),
  body: z.object({
    name: z.string().min(2, 'Crop name must be at least 2 characters').max(50, 'Crop name cannot exceed 50 characters').optional(),
    type: z.enum(cropTypes, {
      errorMap: () => ({ message: 'Invalid crop type' })
    }).optional(),
    variety: z.string().max(50, 'Variety cannot exceed 50 characters').optional(),
    plantingDate: z.string().datetime('Invalid planting date format').optional(),
    harvestDate: z.string().datetime('Invalid harvest date format').optional(),
    yield: z.number().positive('Yield must be positive').optional()
  })
});

export const getCropSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Crop ID is required')
  })
});
