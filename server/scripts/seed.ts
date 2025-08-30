import { connectDB, disconnectDB } from '../lib/db.js';
import { User } from '../models/User.js';
import { Farm } from '../models/Farm.js';
import { Crop, CropType } from '../models/Crop.js';
import { CarbonCredit, CreditStatus } from '../models/CarbonCredit.js';
import { IndustryProfile, IndustryType } from '../models/IndustryProfile.js';

async function seed() {
  try {
    console.log('🌱 Starting database seeding...');
    
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Farm.deleteMany({});
    await Crop.deleteMany({});
    await CarbonCredit.deleteMany({});
    await IndustryProfile.deleteMany({});

    console.log('🗑️  Cleared existing data');

    // Create sample users
    const farmer1 = new User({
      name: 'John Farmer',
      email: 'john@farmer.com',
      password: 'password123',
      role: 'farmer'
    });

    const farmer2 = new User({
      name: 'Sarah Farmer',
      email: 'sarah@farmer.com',
      password: 'password123',
      role: 'farmer'
    });

    const industry1 = new User({
      name: 'Green Industries',
      email: 'contact@greenindustries.com',
      password: 'password123',
      role: 'industry'
    });

    const industry2 = new User({
      name: 'Eco Manufacturing',
      email: 'info@ecomanufacturing.com',
      password: 'password123',
      role: 'industry'
    });

    await User.insertMany([farmer1, farmer2, industry1, industry2]);
    console.log('👥 Created sample users');

    // Create sample farms
    const farm1 = new Farm({
      name: 'Green Valley Farm',
      location: 'California, USA',
      size: 150.5,
      description: 'Organic vegetable and grain farm',
      userId: farmer1._id
    });

    const farm2 = new Farm({
      name: 'Sunset Ranch',
      location: 'Texas, USA',
      size: 300.0,
      description: 'Cattle and crop farm',
      userId: farmer1._id
    });

    const farm3 = new Farm({
      name: 'Meadow Brook Farm',
      location: 'Iowa, USA',
      size: 200.0,
      description: 'Corn and soybean farm',
      userId: farmer2._id
    });

    await Farm.insertMany([farm1, farm2, farm3]);
    console.log('🏡 Created sample farms');

    // Create sample crops
    const crop1 = new Crop({
      name: 'Organic Wheat',
      type: CropType.WHEAT,
      variety: 'Winter Wheat',
      plantingDate: new Date('2024-10-15'),
      harvestDate: new Date('2025-06-20'),
      yield: 45.5,
      farmId: farm1._id
    });

    const crop2 = new Crop({
      name: 'Sweet Corn',
      type: CropType.CORN,
      variety: 'Golden Sweet',
      plantingDate: new Date('2024-04-01'),
      harvestDate: new Date('2024-08-15'),
      yield: 120.0,
      farmId: farm1._id
    });

    const crop3 = new Crop({
      name: 'Soybeans',
      type: CropType.SOYBEANS,
      variety: 'Roundup Ready',
      plantingDate: new Date('2024-05-01'),
      harvestDate: new Date('2024-10-15'),
      yield: 85.0,
      farmId: farm2._id
    });

    const crop4 = new Crop({
      name: 'Field Corn',
      type: CropType.CORN,
      variety: 'Dent Corn',
      plantingDate: new Date('2024-04-15'),
      harvestDate: new Date('2024-09-30'),
      yield: 200.0,
      farmId: farm3._id
    });

    await Crop.insertMany([crop1, crop2, crop3, crop4]);
    console.log('🌾 Created sample crops');

    // Create sample industry profiles
    const industryProfile1 = new IndustryProfile({
      name: 'Green Industries Corp',
      industryType: IndustryType.MANUFACTURING,
      description: 'Sustainable manufacturing company focused on green technologies',
      userId: industry1._id
    });

    const industryProfile2 = new IndustryProfile({
      name: 'Eco Manufacturing Solutions',
      industryType: IndustryType.FOOD_PROCESSING,
      description: 'Food processing company with focus on organic and sustainable practices',
      userId: industry2._id
    });

    await IndustryProfile.insertMany([industryProfile1, industryProfile2]);
    console.log('🏭 Created sample industry profiles');

    // Create sample carbon credits
    const credit1 = new CarbonCredit({
      amount: 25.5,
      price: 45.0,
      status: CreditStatus.VERIFIED,
      farmId: farm1._id,
      userId: farmer1._id
    });

    const credit2 = new CarbonCredit({
      amount: 18.0,
      price: 42.0,
      status: CreditStatus.PENDING,
      farmId: farm2._id,
      userId: farmer1._id
    });

    const credit3 = new CarbonCredit({
      amount: 30.0,
      price: 48.0,
      status: CreditStatus.SOLD,
      farmId: farm3._id,
      userId: farmer2._id,
      industryId: industryProfile1._id
    });

    const credit4 = new CarbonCredit({
      amount: 22.5,
      price: 44.0,
      status: CreditStatus.VERIFIED,
      farmId: farm1._id,
      userId: farmer1._id
    });

    await CarbonCredit.insertMany([credit1, credit2, credit3, credit4]);
    console.log('🌱 Created sample carbon credits');

    console.log('✅ Database seeding completed successfully!');
    console.log('\n📊 Sample Data Summary:');
    console.log('- Users: 4 (2 farmers, 2 industries)');
    console.log('- Farms: 3');
    console.log('- Crops: 4');
    console.log('- Industry Profiles: 2');
    console.log('- Carbon Credits: 4');
    console.log('\n🔑 Test Credentials:');
    console.log('Farmer 1: john@farmer.com / password123');
    console.log('Farmer 2: sarah@farmer.com / password123');
    console.log('Industry 1: contact@greenindustries.com / password123');
    console.log('Industry 2: info@ecomanufacturing.com / password123');

  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await disconnectDB();
  }
}

// Run the seed function
seed();
