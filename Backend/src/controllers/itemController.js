import Item from "../models/Item.js";

// Create a new item
export const createItem = async (req, res) => {
  const {
    itemName,
    itemDescription,
    itemCategory,
    itemSKU,
    quantity,
    reorderPoint,
    unitPrice,
    stockLocation,
    supplier,
  } = req.body;

  try {
    const newItem = new Item({
      itemName,
      itemDescription,
      itemCategory,
      itemSKU,
      quantity,
      reorderPoint,
      unitPrice,
      stockLocation,
      supplier,
    });

    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all items
export const getItems = async (req, res) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete an item by ID
export const deleteItem = async (req, res) => {
  const { id } = req.params;

  try {
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update an item by ID
export const updateItem = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    const updatedItem = await Item.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
