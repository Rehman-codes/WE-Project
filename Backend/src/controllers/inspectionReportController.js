import InspectionReport from "../models/InspectionReport.js";

// Create a new inspection report
export const createInspectionReport = async (req, res) => {
  try {
    const {
      inspectionItem,
      supplier,
      inspectionDate,
      qualityCheck,
      quantityCheck,
      inspector,
      notes,
    } = req.body;

    // Validate the input
    if (
      !inspectionItem ||
      !supplier ||
      !inspectionDate ||
      !qualityCheck ||
      !quantityCheck ||
      !inspector ||
      !notes
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Create a new inspection report
    const newReport = new InspectionReport({
      inspectionItem,
      supplier,
      inspectionDate,
      qualityCheck,
      quantityCheck,
      inspector,
      notes,
    });

    // Save the inspection report to the database
    const savedReport = await newReport.save();

    return res.status(201).json(savedReport);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error creating inspection report." });
  }
};

// Get all inspection reports
export const getInspectionReports = async (req, res) => {
  try {
    // Fetch all inspection reports from the database
    const reports = await InspectionReport.find();

    return res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching inspection reports." });
  }
};

// Delete an inspection report by ID
export const deleteInspectionReport = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the report by ID and delete it
    const deletedReport = await InspectionReport.findByIdAndDelete(id);

    if (!deletedReport) {
      return res.status(404).json({ message: "Inspection report not found." });
    }

    return res
      .status(200)
      .json({ message: "Inspection report deleted successfully." });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error deleting inspection report." });
  }
};

// Update an inspection report by ID
export const updateInspectionReport = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      inspectionItem,
      supplier,
      inspectionDate,
      qualityCheck,
      quantityCheck,
      inspector,
      notes,
    } = req.body;

    // Validate the input
    if (
      !inspectionItem ||
      !supplier ||
      !inspectionDate ||
      !qualityCheck ||
      !quantityCheck ||
      !inspector ||
      !notes
    ) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find the inspection report by ID and update it
    const updatedReport = await InspectionReport.findByIdAndUpdate(
      id,
      {
        inspectionItem,
        supplier,
        inspectionDate,
        qualityCheck,
        quantityCheck,
        inspector,
        notes,
      },
      { new: true } // Return the updated report
    );

    if (!updatedReport) {
      return res.status(404).json({ message: "Inspection report not found." });
    }

    return res.status(200).json(updatedReport);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error updating inspection report." });
  }
};
