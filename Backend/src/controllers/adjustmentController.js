import Adjustment from '../models/Adjustment.js';

// Get all adjustments
export const getAdjustments = async (req, res) => {
  try {
    const adjustments = await Adjustment.find();
    res.status(200).json(adjustments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an adjustment by ID
export const deleteAdjustment = async (req, res) => {
  const { id } = req.params;
  try {
    const adjustment = await Adjustment.findByIdAndDelete(id);
    if (!adjustment) {
      return res.status(404).json({ message: 'Adjustment not found' });
    }
    res.status(200).json({ message: 'Adjustment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update the resolved field of an adjustment by ID
export const updateAdjustment = async (req, res) => {
  const { id } = req.params;
  const { resolved } = req.body;
  try {
    const adjustment = await Adjustment.findByIdAndUpdate(
      id,
      { resolved },
      { new: true }
    );
    if (!adjustment) {
      return res.status(404).json({ message: 'Adjustment not found' });
    }
    res.status(200).json(adjustment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
