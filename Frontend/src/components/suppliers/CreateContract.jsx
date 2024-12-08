import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

const CreateContract = () => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()

    const handleSubmit = (event) => {
        event.preventDefault()
        // Handle form submission here
        console.log('Form submitted')
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className="w-[95%] h-[90%] bg-white rounded-lg shadow-lg p-7 flex flex-col space-y-6">
                <h2 className="text-xl font-bold">Create Contract</h2>

                <div>
                    <label htmlFor="contractTitle" className="block text-sm font-medium text-gray-700 mb-1">
                        Contract Title
                    </label>
                    <Input id="contractTitle" required placeholder="Enter contract title" />
                </div>

                <div>
                    <label htmlFor="supplierName" className="block text-sm font-medium text-gray-700 mb-1">
                        Supplier Name
                    </label>
                    <Select required>
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
                                className={`w-full justify-start text-left font-normal ${!startDate && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
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
                                className={`w-full justify-start text-left font-normal ${!endDate && "text-muted-foreground"}`}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div>
                    <label htmlFor="termsAndConditions" className="block text-sm font-medium text-gray-700 mb-1">
                        Terms and Conditions
                    </label>
                    <Textarea id="termsAndConditions" required placeholder="Enter terms and conditions" />
                </div>

                <Button type="submit" className="w-full">Create</Button>
            </form>
        </div>
    )
};

export default CreateContract;