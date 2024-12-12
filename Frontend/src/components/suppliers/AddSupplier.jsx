import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const performanceOptions = ["Excellent", "Good", "Average", "Poor"];

const AddSupplier = () => {
    const [formData, setFormData] = useState({
        supplierName: "",
        email: "",
        phone: "",
        address: "",
        companyName: "",
        performance: "",
    });

    const API_URL = import.meta.env.VITE_API_URL;

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handlePerformanceChange = (value) => {
        setFormData((prev) => ({ ...prev, performance: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`${API_URL}/supplier/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("Supplier added successfully");
            } else {
                console.error("Failed to add supplier");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <Card className="w-[97%] h-[90%] bg-white rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Add New Supplier</CardTitle>
                </CardHeader>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-4">
                        {["supplierName", "email", "phone", "companyName"].map((field) => (
                            <div key={field} className="space-y-2">
                                <Label htmlFor={field}>{field.replace(/([A-Z])/g, " $1")}</Label>
                                <Input id={field} value={formData[field]} onChange={handleChange} required />
                            </div>
                        ))}
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Textarea id="address" value={formData.address} onChange={handleChange} required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="performance">Performance</Label>
                            <Select onValueChange={handlePerformanceChange} required>
                                <SelectTrigger id="performance">
                                    <SelectValue placeholder="Select performance" />
                                </SelectTrigger>
                                <SelectContent>
                                    {performanceOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">Add</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
};

export default AddSupplier;
