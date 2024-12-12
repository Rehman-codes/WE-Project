import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from 'lucide-react'
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "../ui/textarea"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

const CreateInspectionReport = () => {
    // Initialize form state using an object
    const [formData, setFormData] = useState({
        inspectionItem: '',
        supplier: '',
        inspectionDate: null,
        qualityCheck: '',
        quantityCheck: '',
        inspector: '',
        notes: ''
    })
    const [error, setError] = useState('')

    const API_URL = import.meta.env.VITE_API_URL;

    // Handle input changes for all fields
    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [id]: value
        }))
    }

    const handleSelectChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value
        }))
    }

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault()

        // Check if the inspection date is selected
        if (!formData.inspectionDate) {
            setError('Inspection date is required.')
            return
        }

        // Check for other required fields (no custom validation needed here as "required" HTML attribute handles that)
        if (!formData.inspectionItem || !formData.supplier || !formData.qualityCheck || !formData.quantityCheck || !formData.inspector) {
            setError('All fields are required.')
            return
        }

        // Prepare the data to be sent
        const reportData = { ...formData }

        try {
            // Send the data to the API (you can replace the URL with the actual one)
            const response = await fetch(`${API_URL}/inspectionReport/create`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(reportData)
            })

            if (response.ok) {
                console.log("Inspection Report created successfully");
                // Reset form after successful submission
                setFormData({
                    inspectionItem: '',
                    supplier: '',
                    inspectionDate: null,
                    qualityCheck: '',
                    quantityCheck: '',
                    inspector: '',
                    notes: ''
                })
            } else {
                setError("Failed to create inspection report.")
            }
        } catch (error) {
            console.error(error)
            setError("Error creating inspection report.")
        }
    }

    return (
        <div>
            <Card className="w-[95%] h-[90%] m-4 bg-white rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Create Inspection Report</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Inspection Item */}
                        <div className="space-y-2">
                            <Label htmlFor="inspectionItem">Inspection Item</Label>
                            <Select
                                id="inspectionItem"
                                value={formData.inspectionItem}
                                onValueChange={(value) => handleSelectChange('inspectionItem', value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select item" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="item1">Item 1</SelectItem>
                                    <SelectItem value="item2">Item 2</SelectItem>
                                    <SelectItem value="item3">Item 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Supplier Name */}
                        <div className="space-y-2">
                            <Label htmlFor="supplier">Supplier name</Label>
                            <Select
                                id="supplier"
                                value={formData.supplier}
                                onValueChange={(value) => handleSelectChange('supplier', value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="supplier1">Supplier 1</SelectItem>
                                    <SelectItem value="supplier2">Supplier 2</SelectItem>
                                    <SelectItem value="supplier3">Supplier 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Inspection Date */}
                        <div className="space-y-2">
                            <Label htmlFor="inspectionDate">Inspection date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!formData.inspectionDate && "text-muted-foreground"}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {formData.inspectionDate ? format(formData.inspectionDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={formData.inspectionDate}
                                        onSelect={(date) => handleSelectChange('inspectionDate', date)}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                            {error && <p className="text-red-500">{error}</p>}
                        </div>

                        {/* Quality Check */}
                        <div className="space-y-2">
                            <Label htmlFor="qualityCheck">Quality check</Label>
                            <Select
                                id="qualityCheck"
                                value={formData.qualityCheck}
                                onValueChange={(value) => handleSelectChange('qualityCheck', value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select quality check" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pass">Pass</SelectItem>
                                    <SelectItem value="fail">Fail</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Quantity Check */}
                        <div className="space-y-2">
                            <Label htmlFor="quantityCheck">Quantity check</Label>
                            <Select
                                id="quantityCheck"
                                value={formData.quantityCheck}
                                onValueChange={(value) => handleSelectChange('quantityCheck', value)}
                                required
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select quantity check" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="correct">Correct</SelectItem>
                                    <SelectItem value="incorrect">Incorrect</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Inspector */}
                        <div className="space-y-2">
                            <Label htmlFor="inspector">Inspector</Label>
                            <Input
                                id="inspector"
                                type="text"
                                value={formData.inspector}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Notes */}
                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes/Issues</Label>
                            <Textarea
                                id="notes"
                                value={formData.notes}
                                onChange={handleChange}
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-4">
                            <Button type="submit" className="w-full">Create</Button>
                        </div>
                    </form>
                </CardContent>
                <CardFooter />
            </Card>
        </div>
    )
};

export default CreateInspectionReport;
