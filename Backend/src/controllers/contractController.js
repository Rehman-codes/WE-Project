import Contract from "../models/Contract.js";

export const createContract = async (req, res) => {
  try {
    const newContract = new Contract(req.body);
    await newContract.save();
    res
      .status(201)
      .json({ message: "Contract created successfully", data: newContract });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create contract", error: error.message });
  }
};

export const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find();
    res.status(200).json(contracts);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch contracts", error: error.message });
  }
};

export const deleteContract = async (req, res) => {
  try {
    const { id } = req.params;
    await Contract.findByIdAndDelete(id);
    res.status(200).json({ message: "Contract deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete contract", error: error.message });
  }
};

export const updateContract = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedContract = await Contract.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res
      .status(200)
      .json({
        message: "Contract updated successfully",
        data: updatedContract,
      });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update contract", error: error.message });
  }
};
