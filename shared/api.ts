/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'farmer' | 'industry';
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: 'farmer' | 'industry';
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role: 'farmer' | 'industry';
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

// Farm types
export interface Farm {
  id: string;
  name: string;
  location: string;
  size: number;
  description?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFarmRequest {
  name: string;
  location: string;
  size: number;
  description?: string;
}

export interface UpdateFarmRequest {
  name?: string;
  location?: string;
  size?: number;
  description?: string;
}

// Crop types
export type CropType = 'wheat' | 'corn' | 'soybeans' | 'cotton' | 'rice' | 'sugarcane' | 'coffee' | 'tea' | 'fruits' | 'vegetables' | 'other';

export interface Crop {
  id: string;
  name: string;
  type: CropType;
  variety?: string;
  plantingDate: string;
  harvestDate?: string;
  yield?: number;
  farmId: string;
  farm?: Farm;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCropRequest {
  name: string;
  type: CropType;
  variety?: string;
  plantingDate: string;
  harvestDate?: string;
  yield?: number;
  farmId: string;
}

export interface UpdateCropRequest {
  name?: string;
  type?: CropType;
  variety?: string;
  plantingDate?: string;
  harvestDate?: string;
  yield?: number;
}

// Carbon Credit types
export type CreditStatus = 'pending' | 'verified' | 'sold' | 'cancelled';

export interface CarbonCredit {
  id: string;
  amount: number;
  price: number;
  status: CreditStatus;
  farmId?: string;
  farm?: Farm;
  userId: string;
  user?: User;
  industryId?: string;
  industry?: IndustryProfile;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCarbonCreditRequest {
  amount: number;
  price: number;
  farmId?: string;
}

export interface UpdateCreditStatusRequest {
  status: CreditStatus;
}

// Industry Profile types
export type IndustryType = 'manufacturing' | 'food_processing' | 'textile' | 'chemical' | 'energy' | 'transportation' | 'construction' | 'other';

export interface IndustryProfile {
  id: string;
  name: string;
  industryType: IndustryType;
  description?: string;
  userId: string;
  user?: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreateIndustryProfileRequest {
  name: string;
  industryType: IndustryType;
  description?: string;
}

// API Response types
export interface ApiResponse<T = any> {
  message?: string;
  data?: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Dashboard types
export interface DashboardStats {
  totalFarms: number;
  totalCrops: number;
  totalCarbonCredits: number;
  totalCreditsSold: number;
  totalRevenue: number;
}

export interface FarmStats {
  farmId: string;
  farmName: string;
  cropCount: number;
  totalYield: number;
  carbonCredits: number;
}
