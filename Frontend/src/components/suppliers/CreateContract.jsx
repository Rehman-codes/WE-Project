import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const CreateContract = () => {
    const [formData, setFormData] = useState({
        contractTitle: "",
        supplierName: "",
        startDate: null,
        endDate: null,
        termsAndConditions: "",
    });

    const handleChange = (event) => {
        const { id, value } = event.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };

    const handleDateChange = (key, date) => {
        setFormData((prev) => ({ ...prev, [key]: date }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch("http://localhost:3000/contract/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (response.ok) {
                console.log("Contract created successfully");
            } else {
                console.error("Failed to create contract");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-[95%] h-[90%] bg-white rounded-lg shadow-lg p-7 flex flex-col space-y-6">
                <h2 className="text-xl font-bold">Create Contract</h2>

                <div>
                    <label htmlFor="contractTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Contract Title
                    </label>
                    <Input
                        id="contractTitle"
                        value={formData.contractTitle}
                        onChange={handleChange}
                        required
                        placeholder="Enter contract title"
                    />
                </div>

                <div>
                    <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700 mb-1">
                        Supplier Name
                    </label>
                    <Select onValueChange={(value) => setFormData((prev) => ({ ...prev, supplierName: value }))} required>
                        <SelectTrigger id="supplierName">
                            <SelectValue placeholder="Select supplier" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="supplier1">Supplier 1</SelectItem>
                            <SelectItem value="supplier2">Supplier 2</SelectItem>
                            <SelectItem value="supplier3">Supplier 3</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal ${!formData.startDate && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.startDate ? format(formData.startDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={formData.startDate}
                                onSelect={(date) => handleDateChange("startDate", date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={`w-full justify-start text-left font-normal ${!formData.endDate && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {formData.endDate ? format(formData.endDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={formData.endDate}
                                onSelect={(date) => handleDateChange("endDate", date)}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700 mb-1">
                        Terms and Conditions
                    </label>
                    <Textarea
                        id="termsAndConditions"
                        value={formData.termsAndConditions}
                        onChange={handleChange}
                        required
                        placeholder="Enter terms and conditions"
                    />
                </div>

                <Button type="submit" className="w-full">Create</Button>
            </form>
        </div>
    );
};

export default CreateContract;
