import { Router } from 'express';
import { Farm } from '../models/Farm.js';
import { auth, requireRole } from '../middleware/auth.js';
import { validate } from '../middleware/validation.js';
import { createFarmSchema, updateFarmSchema, getFarmSchema } from '../schemas/farm.js';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all farms for the authenticated user
router.get('/', auth, requireRole(['farmer']), async (req: AuthRequest, res) => {
  try {
    const farms = await Farm.find({ userId: req.user?._id }).sort({ createdAt: -1 });
    res.json({ farms });
  } catch (error) {
    console.error('Get farms error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific farm
router.get('/:id', auth, requireRole(['farmer']), validate(getFarmSchema), async (req: AuthRequest, res) => {
  try {
    const farm = await Farm.findOne({ 
      _id: req.params.id, 
      userId: req.user?._id 
    });

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.json({ farm });
  } catch (error) {
    console.error('Get farm error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new farm
router.post('/', auth, requireRole(['farmer']), validate(createFarmSchema), async (req: AuthRequest, res) => {
  try {
    const { name, location, size, description } = req.body;

    const farm = new Farm({
      name,
      location,
      size,
      description,
      userId: req.user?._id
    });

    await farm.save();

    res.status(201).json({
      message: 'Farm created successfully',
      farm
    });
  } catch (error) {
    console.error('Create farm error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update a farm
router.put('/:id', auth, requireRole(['farmer']), validate(updateFarmSchema), async (req: AuthRequest, res) => {
  try {
    const { name, location, size, description } = req.body;

    const farm = await Farm.findOneAndUpdate(
      { _id: req.params.id, userId: req.user?._id },
      { name, location, size, description },
      { new: true, runValidators: true }
    );

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.json({
      message: 'Farm updated successfully',
      farm
    });
  } catch (error) {
    console.error('Update farm error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a farm
router.delete('/:id', auth, requireRole(['farmer']), validate(getFarmSchema), async (req: AuthRequest, res) => {
  try {
    const farm = await Farm.findOneAndDelete({ 
      _id: req.params.id, 
      userId: req.user?._id 
    });

    if (!farm) {
      return res.status(404).json({ message: 'Farm not found' });
    }

    res.json({ message: 'Farm deleted successfully' });
  } catch (error) {
    console.error('Delete farm error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
