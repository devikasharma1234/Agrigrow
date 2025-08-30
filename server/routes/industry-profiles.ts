import { Router } from 'express';
import { IndustryProfile, IndustryType } from '../models/IndustryProfile.js';
import { auth, requireRole } from '../middleware/auth.js';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get industry profile for the authenticated user
router.get('/me', auth, requireRole(['industry']), async (req: AuthRequest, res) => {
  try {
    const profile = await IndustryProfile.findOne({ userId: req.user?._id });

    if (!profile) {
      return res.status(404).json({ message: 'Industry profile not found' });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Get industry profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update industry profile
router.post('/me', auth, requireRole(['industry']), async (req: AuthRequest, res) => {
  try {
    const { name, industryType, description } = req.body;

    let profile = await IndustryProfile.findOne({ userId: req.user?._id });

    if (profile) {
      // Update existing profile
      profile.name = name || profile.name;
      profile.industryType = industryType || profile.industryType;
      profile.description = description !== undefined ? description : profile.description;
    } else {
      // Create new profile
      profile = new IndustryProfile({
        name: name || req.user?.name || 'Industry',
        industryType: industryType || IndustryType.OTHER,
        description,
        userId: req.user?._id
      });
    }

    await profile.save();

    res.json({
      message: profile.isNew ? 'Industry profile created successfully' : 'Industry profile updated successfully',
      profile
    });
  } catch (error) {
    console.error('Create/update industry profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all industry profiles (for admin purposes)
router.get('/', auth, requireRole(['industry']), async (req: AuthRequest, res) => {
  try {
    const profiles = await IndustryProfile.find()
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({ profiles });
  } catch (error) {
    console.error('Get all industry profiles error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific industry profile
router.get('/:id', auth, requireRole(['industry']), async (req: AuthRequest, res) => {
  try {
    const profile = await IndustryProfile.findById(req.params.id)
      .populate('userId', 'name email');

    if (!profile) {
      return res.status(404).json({ message: 'Industry profile not found' });
    }

    res.json({ profile });
  } catch (error) {
    console.error('Get industry profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
