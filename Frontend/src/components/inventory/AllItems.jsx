import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const itemCategories = ["Category A", "Category B", "Category C"];
const suppliers = ["Supplier X", "Supplier Y", "Supplier Z"];

const AllItems = () => {
    const [items, setItems] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch items from the API when the component mounts
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await fetch(`${API_URL}/item/all`);
                if (response.ok) {
                    const data = await response.json();
                    setItems(data);
                    console.log(data);

                } else {
                    alert("Failed to load items.");
                }
            } catch (error) {
                console.error("Error fetching items:", error);
                alert("Error fetching items.");
            }
        };

        fetchItems();
    }, []);

    // Update item in the local state and send API request to update the database
    const handleChange = (id, field, value) => {
        setItems((prevItems) => {
            const updatedItems = prevItems.map((item) =>
                item._id === id
                    ? { ...item, [field]: value }
                    : item
            );
            const updatedItem = updatedItems.find((item) => item._id === id);
            handleUpdate(updatedItem); // Pass the updated item directly
            return updatedItems;
        });
    };

    // API call to update item
    const handleUpdate = async (updatedItem) => {
        try {
            const response = await fetch(`${API_URL}/item/${updatedItem._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedItem),
            });

            if (response.ok) {
                console.log("Item updated successfully");
            } else {
                alert("Failed to update the item");
            }
        } catch (error) {
            console.error("Error updating item:", error);
            alert("Error updating the item");
        }
    };

    // API call to delete item
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/item/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setItems((prevItems) => prevItems.filter((item) => item._id !== id));
                console.log("Item deleted successfully");
            } else {
                alert("Failed to delete item");
            }
        } catch (error) {
            console.error("Error deleting item:", error);
            alert("Error deleting item");
        }
    };


    return (
        <div className="flex justify-center items-center">
            <div className="w-[100%] h-[95%] m-1">
                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Item Description</TableHead>
                            <TableHead>Item Category</TableHead>
                            <TableHead>Item SKU/Barcode</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Reorder Point</TableHead>
                            <TableHead>Unit Price</TableHead>
                            <TableHead>Stock Location</TableHead>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead className="text-right">Operation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {items.map((item, index) => (
                            <tr key={item._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Input
                                        value={item.itemName}
                                        onChange={(e) => handleChange(item._id, "itemName", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={item.itemDescription}
                                        onChange={(e) => handleChange(item._id, "itemDescription", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={item.itemCategory}
                                        onValueChange={(value) => handleChange(item._id, "itemCategory", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{item.itemCategory}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {itemCategories.map((category) => (
                                                <SelectItem key={category} value={category}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={item.itemSKU}
                                        onChange={(e) => handleChange(item._id, "itemSKU", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleChange(item._id, "quantity", parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.reorderPoint}
                                        onChange={(e) => handleChange(item._id, "reorderPoint", parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.unitPrice}
                                        onChange={(e) => handleChange(item._id, "unitPrice", parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={item.stockLocation}
                                        onChange={(e) => handleChange(item._id, "stockLocation", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={item.supplier}
                                        onValueChange={(value) => handleChange(item._id, "supplier", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{item.supplier}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {suppliers.map((name) => (
                                                <SelectItem key={name} value={name}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(item._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </tr>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AllItems;
