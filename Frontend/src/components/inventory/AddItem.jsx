import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"

// Dummy data for dropdowns
const categories = ['Electronics', 'Clothing', 'Food', 'Books', 'Toys']
const locations = ['Warehouse A', 'Warehouse B', 'Store Front', 'Back Office']
const suppliers = ['Supplier A', 'Supplier B', 'Supplier C', 'Supplier D']
const qualityStandards = ['ISO 9001', 'CE', 'FDA', 'USDA Organic']

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
        supplier: '',
        expirationDetails: '',
        qualityStandard: '',
        brandName: '',
        tagsKeywords: '',
        weight: '',
        image: '',
        notes: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSelectChange = (name) => (value) => {
        setFormData(prevState => ({ ...prevState, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(formData)
        // Here you would typically send the data to your backend
    }

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

                <fieldset className="mb-6">
                    <legend className="text-lg font-semibold mb-2">Additional Details</legend>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="expirationDetails">Expiration Details</Label>
                            <Input id="expirationDetails" name="expirationDetails" value={formData.expirationDetails} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="qualityStandard">Quality Standard</Label>
                            <Select name="qualityStandard" onValueChange={handleSelectChange('qualityStandard')}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select quality standard" />
                                </SelectTrigger>
                                <SelectContent>
                                    {qualityStandards.map(standard => (
                                        <SelectItem key={standard} value={standard}>{standard}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div>
                            <Label htmlFor="brandName">Brand Name</Label>
                            <Input id="brandName" name="brandName" value={formData.brandName} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="tagsKeywords">Tags/Keywords</Label>
                            <Input id="tagsKeywords" name="tagsKeywords" value={formData.tagsKeywords} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="weight">Weight</Label>
                            <Input id="weight" name="weight" value={formData.weight} onChange={handleInputChange} />
                        </div>
                        <div>
                            <Label htmlFor="image">Image URL</Label>
                            <Input id="image" name="image" value={formData.image} onChange={handleInputChange} />
                        </div>
                        <div className="col-span-2">
                            <Label htmlFor="notes">Notes/Remarks</Label>
                            <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} />
                        </div>
                    </div>
                </fieldset>

                <Button type="submit" className="w-full">Submit</Button>
            </form>
        </div>
    )
};

export default AddItem;
