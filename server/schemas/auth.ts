import { z } from 'zod';

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['farmer', 'industry'], {
      errorMap: () => ({ message: 'Role must be either farmer or industry' })
    })
  })
});

export const signupSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name cannot exceed 50 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    role: z.enum(['farmer', 'industry'], {
      errorMap: () => ({ message: 'Role must be either farmer or industry' })
    })
  })
});
