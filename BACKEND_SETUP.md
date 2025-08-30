# Backend Setup Guide

This guide will help you set up the complete MongoDB backend for the AgriGrow agricultural platform.

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- pnpm (recommended) or npm

## Installation

1. **Install Dependencies**
   ```bash
   pnpm install
   ```

2. **Environment Configuration**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   MONGODB_URI=mongodb://localhost:27017/agrigrow
   
   # JWT Configuration
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   
   # Server Configuration
   PORT=8080
   NODE_ENV=development
   
   # Client Configuration
   CLIENT_URL=http://localhost:3000
   ```

3. **MongoDB Setup**
   
   **Option A: Local MongoDB**
   - Install MongoDB Community Edition
   - Start MongoDB service
   - Create database: `agrigrow`

   **Option B: MongoDB Atlas (Recommended for production)**
   - Create a free MongoDB Atlas account
   - Create a new cluster
   - Get your connection string
   - Update `MONGODB_URI` in `.env`

4. **Database Seeding**
   ```bash
   pnpm run db:seed
   ```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm db:seed` - Seed database with sample data
- `pnpm typecheck` - Run TypeScript validation

## API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user profile
- `PUT /api/auth/me` - Update user profile

### Farms (Farmer only)
- `GET /api/farms` - Get all farms for user
- `GET /api/farms/:id` - Get specific farm
- `POST /api/farms` - Create new farm
- `PUT /api/farms/:id` - Update farm
- `DELETE /api/farms/:id` - Delete farm

### Crops (Farmer only)
- `GET /api/crops` - Get all crops for user
- `GET /api/crops/farm/:farmId` - Get crops for specific farm
- `GET /api/crops/:id` - Get specific crop
- `POST /api/crops` - Create new crop
- `PUT /api/crops/:id` - Update crop
- `DELETE /api/crops/:id` - Delete crop

### Carbon Credits
- `GET /api/carbon-credits` - Get user's carbon credits
- `GET /api/carbon-credits/available` - Get available credits (Industry only)
- `GET /api/carbon-credits/:id` - Get specific credit
- `POST /api/carbon-credits` - Create new credit (Farmer only)
- `PATCH /api/carbon-credits/:id/status` - Update credit status
- `POST /api/carbon-credits/:id/purchase` - Purchase credit (Industry only)
- `DELETE /api/carbon-credits/:id` - Delete credit (Farmer only)

### Industry Profiles (Industry only)
- `GET /api/industry-profiles/me` - Get user's industry profile
- `POST /api/industry-profiles/me` - Create/update industry profile
- `GET /api/industry-profiles` - Get all industry profiles
- `GET /api/industry-profiles/:id` - Get specific industry profile

### Utility
- `GET /api/health` - Health check
- `GET /api/ping` - Simple ping endpoint
- `GET /api/demo` - Demo endpoint

## Sample Data

After running the seed script, you'll have access to:

### Test Users
- **Farmer 1**: john@farmer.com / password123
- **Farmer 2**: sarah@farmer.com / password123
- **Industry 1**: contact@greenindustries.com / password123
- **Industry 2**: info@ecomanufacturing.com / password123

### Sample Data
- 3 farms with different locations and sizes
- 4 crops (wheat, corn, soybeans) with planting/harvest dates
- 2 industry profiles
- 4 carbon credits in various states

## Authentication

The API uses JWT tokens for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Role-Based Access

- **Farmers**: Can manage farms, crops, and carbon credits
- **Industries**: Can view available carbon credits and purchase them

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "errors": [
    {
      "field": "fieldName",
      "message": "Validation error message"
    }
  ]
}
```

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Rate limiting (100 requests per 15 minutes)
- Helmet.js security headers
- CORS configuration
- Input validation with Zod
- MongoDB injection protection

## Development

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. The server will be available at `http://localhost:8080`

3. API endpoints are prefixed with `/api/`

4. Frontend integration is handled through the Vite dev server

## Production Deployment

1. Set `NODE_ENV=production`
2. Use a strong `JWT_SECRET`
3. Configure MongoDB Atlas for production
4. Set appropriate CORS origins
5. Build the application:
   ```bash
   pnpm build
   pnpm start
   ```

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string format
- Verify network access for Atlas

### Authentication Issues
- Check JWT token expiration
- Verify token format in Authorization header
- Ensure user exists in database

### Validation Errors
- Check request body format
- Verify required fields are present
- Ensure data types match schema

## Support

For issues or questions, check the console logs for detailed error messages and refer to the API documentation above.
