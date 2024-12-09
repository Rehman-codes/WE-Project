import Supplier from "../models/Supplier.js";

export const createSupplier = async (req, res) => {
  try {
    const newSupplier = new Supplier(req.body);
    await newSupplier.save();
    res
      .status(201)
      .json({ message: "Supplier created successfully", data: newSupplier });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create supplier", error: error.message });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.status(200).json(suppliers);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch suppliers", error: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    await Supplier.findByIdAndDelete(id);
    res.status(200).json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete supplier", error: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSupplier = await Supplier.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "Supplier updated successfully",
        data: updatedSupplier,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update supplier", error: error.message });
  }
};
