import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

// Dummy data for dropdowns
const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys'];
const locations = ['Warehouse A', 'Warehouse B', 'Store Front', 'Back Office'];
const suppliers = ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D'];

const AddItem = () => {
    const [formData, setFormData] = useState({
        itemName: '',
        itemDescription: '',
        itemCategory: '',
        itemSKU: '',
        quantity: '',
        reorderPoint: '',
        unitPrice: '',
        stockLocation: '',
        supplier: ''
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');

    const API_URL = import.meta.env.VITE_API_URL;

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSelectChange = (name) => (value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch(`${API_URL}/item/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to add item');
            }

            const newItem = await response.json();
            // Optionally handle the response, such as showing a success message or redirecting
            console.log('Item added:', newItem);

            // Reset form data after successful submission
            setFormData({
                itemName: '',
                itemDescription: '',
                itemCategory: '',
                itemSKU: '',
                quantity: '',
                reorderPoint: '',
                unitPrice: '',
                stockLocation: '',
                supplier: ''
            });
        } catch (error) {
            setError(error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 m-4 w-[95%] h-[90%] overflow-auto">
                <fieldset className="mb-6">
                    <legend className="text-lg font-semibold mb-2">Basic Information</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="itemName">Item Name</Label>
                            <Input id="itemName" name="itemName" value={formData.itemName} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="itemDescription">Item Description</Label>
                            <Textarea id="itemDescription" name="itemDescription" value={formData.itemDescription} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="itemCategory">Item Category</Label>
                            <Select name="itemCategory" onValueChange={handleSelectChange('itemCategory')} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(category => (
                                        <SelectItem key={category} value={category}>{category}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="itemSKU">Item SKU/Barcode</Label>
                            <Input id="itemSKU" name="itemSKU" value={formData.itemSKU} onChange={handleInputChange} required />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="mb-6">
                    <legend className="text-lg font-semibold mb-2">Inventory Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="quantity">Quantity</Label>
                            <Input id="quantity" name="quantity" type="number" value={formData.quantity} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="reorderPoint">Reorder Point</Label>
                            <Input id="reorderPoint" name="reorderPoint" type="number" value={formData.reorderPoint} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="unitPrice">Unit Price</Label>
                            <Input id="unitPrice" name="unitPrice" type="number" step="0.01" value={formData.unitPrice} onChange={handleInputChange} required />
                        </div>
                        <div>
                            <Label htmlFor="stockLocation">Stock Location</Label>
                            <Select name="stockLocation" onValueChange={handleSelectChange('stockLocation')} required>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select location" />
                                </SelectTrigger>
                                <SelectContent>
                                    {locations.map(location => (
                                        <SelectItem key={location} value={location}>{location}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </fieldset>

                <fieldset className="mb-6">
                    <legend className="text-lg font-semibold mb-2">Supplier Information</legend>
                    <div>
                        <Label htmlFor="supplier">Supplier</Label>
                        <Select name="supplier" onValueChange={handleSelectChange('supplier')} required>
                            <SelectTrigger>
                                <SelectValue placeholder="Select supplier" />
                            </SelectTrigger>
                            <SelectContent>
                                {suppliers.map(supplier => (
                                    <SelectItem key={supplier} value={supplier}>{supplier}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </fieldset>

                {error && <div className="text-red-500 text-center mb-4">{error}</div>}
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Adding...' : 'Add Item'}
                </Button>
            </form>
        </div>
    );
};

export default AddItem;
