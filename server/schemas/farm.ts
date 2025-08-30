import { z } from 'zod';

export const createFarmSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Farm name must be at least 2 characters').max(100, 'Farm name cannot exceed 100 characters'),
    location: z.string().min(2, 'Location must be at least 2 characters'),
    size: z.number().positive('Farm size must be positive').min(0.1, 'Farm size must be at least 0.1 acres'),
    description: z.string().max(500, 'Description cannot exceed 500 characters').optional()
  })
});

export const updateFarmSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Farm ID is required')
  }),
  body: z.object({
    name: z.string().min(2, 'Farm name must be at least 2 characters').max(100, 'Farm name cannot exceed 100 characters').optional(),
    location: z.string().min(2, 'Location must be at least 2 characters').optional(),
    size: z.number().positive('Farm size must be positive').min(0.1, 'Farm size must be at least 0.1 acres').optional(),
    description: z.string().max(500, 'Description cannot exceed 500 characters').optional()
  })
});

export const getFarmSchema = z.object({
  params: z.object({
    id: z.string().min(1, 'Farm ID is required')
  })
});
