import { Router } from 'express';
import { CarbonCredit, CreditStatus } from '../models/CarbonCredit.js';
import { Farm } from '../models/Farm.js';
import { IndustryProfile } from '../models/IndustryProfile.js';
import { auth, requireRole } from '../middleware/auth.js';
import { AuthRequest } from '../middleware/auth.js';

const router = Router();

// Get all carbon credits for the authenticated user
router.get('/', auth, async (req: AuthRequest, res) => {
  try {
    const credits = await CarbonCredit.find({ userId: req.user?._id })
      .populate('farmId', 'name location')
      .populate('industryId', 'name industryType')
      .sort({ createdAt: -1 });

    res.json({ credits });
  } catch (error) {
    console.error('Get carbon credits error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get available carbon credits for purchase (for industries)
router.get('/available', auth, requireRole(['industry']), async (req: AuthRequest, res) => {
  try {
    const credits = await CarbonCredit.find({ 
      status: CreditStatus.VERIFIED,
      industryId: { $exists: false }
    })
      .populate('farmId', 'name location')
      .populate('userId', 'name')
      .sort({ createdAt: -1 });

    res.json({ credits });
  } catch (error) {
    console.error('Get available credits error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a specific carbon credit
router.get('/:id', auth, async (req: AuthRequest, res) => {
  try {
    const credit = await CarbonCredit.findById(req.params.id)
      .populate('farmId', 'name location')
      .populate('industryId', 'name industryType')
      .populate('userId', 'name');

    if (!credit) {
      return res.status(404).json({ message: 'Carbon credit not found' });
    }

    // Check if user owns this credit or is an industry looking to buy
    if (credit.userId.toString() !== req.user?._id.toString() && req.user?.role !== 'industry') {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json({ credit });
  } catch (error) {
    console.error('Get carbon credit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create a new carbon credit (for farmers)
router.post('/', auth, requireRole(['farmer']), async (req: AuthRequest, res) => {
  try {
    const { amount, price, farmId } = req.body;

    // Verify the farm belongs to the user
    if (farmId) {
      const farm = await Farm.findOne({ 
        _id: farmId, 
        userId: req.user?._id 
      });

      if (!farm) {
        return res.status(404).json({ message: 'Farm not found' });
      }
    }

    const credit = new CarbonCredit({
      amount,
      price,
      farmId,
      userId: req.user?._id,
      status: CreditStatus.PENDING
    });

    await credit.save();

    const populatedCredit = await credit.populate('farmId', 'name location');

    res.status(201).json({
      message: 'Carbon credit created successfully',
      credit: populatedCredit
    });
  } catch (error) {
    console.error('Create carbon credit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update carbon credit status (for admin/verification)
router.patch('/:id/status', auth, requireRole(['farmer']), async (req: AuthRequest, res) => {
  try {
    const { status } = req.body;

    const credit = await CarbonCredit.findOne({ 
      _id: req.params.id, 
      userId: req.user?._id 
    });

    if (!credit) {
      return res.status(404).json({ message: 'Carbon credit not found' });
    }

    // Only allow status changes to PENDING or CANCELLED by the owner
    if (![CreditStatus.PENDING, CreditStatus.CANCELLED].includes(status)) {
      return res.status(400).json({ message: 'Invalid status change' });
    }

    credit.status = status;
    await credit.save();

    const updatedCredit = await credit.populate('farmId', 'name location');

    res.json({
      message: 'Carbon credit status updated successfully',
      credit: updatedCredit
    });
  } catch (error) {
    console.error('Update carbon credit status error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Purchase carbon credit (for industries)
router.post('/:id/purchase', auth, requireRole(['industry']), async (req: AuthRequest, res) => {
  try {
    const credit = await CarbonCredit.findById(req.params.id);

    if (!credit) {
      return res.status(404).json({ message: 'Carbon credit not found' });
    }

    if (credit.status !== CreditStatus.VERIFIED) {
      return res.status(400).json({ message: 'Credit is not available for purchase' });
    }

    if (credit.industryId) {
      return res.status(400).json({ message: 'Credit has already been purchased' });
    }

    // Get or create industry profile
    let industryProfile = await IndustryProfile.findOne({ userId: req.user?._id });
    
    if (!industryProfile) {
      industryProfile = new IndustryProfile({
        name: req.user?.name || 'Industry',
        industryType: 'other',
        userId: req.user?._id
      });
      await industryProfile.save();
    }

    // Update credit
    credit.industryId = industryProfile._id;
    credit.status = CreditStatus.SOLD;
    await credit.save();

    const updatedCredit = await credit.populate('farmId', 'name location')
      .populate('industryId', 'name industryType');

    res.json({
      message: 'Carbon credit purchased successfully',
      credit: updatedCredit
    });
  } catch (error) {
    console.error('Purchase carbon credit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete a carbon credit (only if pending)
router.delete('/:id', auth, requireRole(['farmer']), async (req: AuthRequest, res) => {
  try {
    const credit = await CarbonCredit.findOne({ 
      _id: req.params.id, 
      userId: req.user?._id 
    });

    if (!credit) {
      return res.status(404).json({ message: 'Carbon credit not found' });
    }

    if (credit.status !== CreditStatus.PENDING) {
      return res.status(400).json({ message: 'Can only delete pending credits' });
    }

    await credit.deleteOne();

    res.json({ message: 'Carbon credit deleted successfully' });
  } catch (error) {
    console.error('Delete carbon credit error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
