import { Router } from 'express';
import { Crop } from '../models/Crop.js';
import { Farm } from '../models/Farm.js';
import { auth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createCropSchema, updateCropSchema, getCropSchema } from '../schemas/crop.js';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all crops for the authenticated user
router.get('/', auth, requireRole(['farmer']), async (req: AuthRequest, res) => {
  try {
    const crops = await Crop.find()
      .populate('farmId', 'name location')
      .sort({ createdAt: -1 });
    
    // Filter crops to only show those from user's farms
    const userFarms = await Farm.find({ userId: req.user?._id });
    const userFarmIds = userFarms.map(farm => farm._id);
    const userCrops = crops.filter(crop => userFarmIds.includes(crop.farmId));

    res.json({ crops: userCrops });
  } catch (error) {
    console.error('Get crops error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get crops for a specific farm
router.get('/farm/:farmId', auth, requireRole(['farmer']), async (req: AuthRequest, res) => {
  try {
    // Verify the farm belongs to the user
    const farm = await Farm.findOne({ 
      _id: req.params.farmId, 
      userId: req.user?._id 
    });

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    const crops = await Crop.find({ farmId: req.params.farmId })
      .populate('farmId', 'name location')
      .sort({ createdAt: -1 });

    res.json({ crops });
  } catch (error) {
    console.error('Get farm crops error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific crop
router.get('/:id', auth, requireRole(['farmer']), validate(getCropSchema), async (req: AuthRequest, res) => {
  try {
    const crop = await Crop.findById(req.params.id).populate('farmId', 'name location');

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Verify the crop belongs to the user
    const farm = await Farm.findOne({ 
      _id: crop.farmId, 
      userId: req.user?._id 
    });

    if (!farm) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ crop });
  } catch (error) {
    console.error('Get crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new crop
router.post('/', auth, requireRole(['farmer']), validate(createCropSchema), async (req: AuthRequest, res) => {
  try {
    const { name, type, variety, plantingDate, harvestDate, yield: cropYield, farmId } = req.body;

    // Verify the farm belongs to the user
    const farm = await Farm.findOne({ 
      _id: farmId, 
      userId: req.user?._id 
    });

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    const crop = new Crop({
      name,
      type,
      variety,
      plantingDate: new Date(plantingDate),
      harvestDate: harvestDate ? new Date(harvestDate) : undefined,
      yield: cropYield,
      farmId
    });

    await crop.save();

    const populatedCrop = await crop.populate('farmId', 'name location');

    res.status(201).json({
      message: 'Crop created successfully',
      crop: populatedCrop
    });
  } catch (error) {
    console.error('Create crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a crop
router.put('/:id', auth, requireRole(['farmer']), validate(updateCropSchema), async (req: AuthRequest, res) => {
  try {
    const { name, type, variety, plantingDate, harvestDate, yield: cropYield } = req.body;

    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Verify the crop belongs to the user
    const farm = await Farm.findOne({ 
      _id: crop.farmId, 
      userId: req.user?._id 
    });

    if (!farm) {
      return res.status(403).json({ message: 'Access denied' });
    }

    // Update crop fields
    if (name) crop.name = name;
    if (type) crop.type = type;
    if (variety !== undefined) crop.variety = variety;
    if (plantingDate) crop.plantingDate = new Date(plantingDate);
    if (harvestDate !== undefined) crop.harvestDate = harvestDate ? new Date(harvestDate) : undefined;
    if (cropYield !== undefined) crop.yield = cropYield;

    await crop.save();

    const updatedCrop = await crop.populate('farmId', 'name location');

    res.json({
      message: 'Crop updated successfully',
      crop: updatedCrop
    });
  } catch (error) {
    console.error('Update crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a crop
router.delete('/:id', auth, requireRole(['farmer']), validate(getCropSchema), async (req: AuthRequest, res) => {
  try {
    const crop = await Crop.findById(req.params.id);

    if (!crop) {
      return res.status(404).json({ message: 'Crop not found' });
    }

    // Verify the crop belongs to the user
    const farm = await Farm.findOne({ 
      _id: crop.farmId, 
      userId: req.user?._id 
    });

    if (!farm) {
      return res.status(403).json({ message: 'Access denied' });
    }

    await crop.deleteOne();

    res.json({ message: 'Crop deleted successfully' });
  } catch (error) {
    console.error('Delete crop error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
