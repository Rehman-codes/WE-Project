import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const itemCategories = ["Category A", "Category B", "Category C"]
const supplierNames = ["Supplier X", "Supplier Y", "Supplier Z"]

const AllItems = () => {
    const [items, setItems] = useState([
        {
            id: 1,
            itemName: "Item 1",
            itemDescription: "Description of Item 1",
            itemCategory: "Category A",
            itemSKU: "SKU12345",
            quantity: 100,
            reorderPoint: 20,
            unitPrice: 10.99,
            stockLocation: "Warehouse A",
            supplierName: "Supplier X",
        },
    ])

    const handleChange = (id, field, value) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id
                    ? {
                        ...item,
                        [field]: value,
                    }
                    : item
            )
        )
    }

    const handleDelete = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id))
    }

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
                        {items.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>
                                    <Input
                                        value={item.itemName}
                                        onChange={(e) => handleChange(item.id, "itemName", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={item.itemDescription}
                                        onChange={(e) => handleChange(item.id, "itemDescription", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={item.itemCategory}
                                        onValueChange={(value) => handleChange(item.id, "itemCategory", value)}
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
                                        onChange={(e) => handleChange(item.id, "itemSKU", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.quantity}
                                        onChange={(e) => handleChange(item.id, "quantity", parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.reorderPoint}
                                        onChange={(e) => handleChange(item.id, "reorderPoint", parseInt(e.target.value, 10))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        type="number"
                                        value={item.unitPrice}
                                        onChange={(e) => handleChange(item.id, "unitPrice", parseFloat(e.target.value))}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={item.stockLocation}
                                        onChange={(e) => handleChange(item.id, "stockLocation", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={item.supplierName}
                                        onValueChange={(value) => handleChange(item.id, "supplierName", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{item.supplierName}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {supplierNames.map((name) => (
                                                <SelectItem key={name} value={name}>
                                                    {name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default AllItems
