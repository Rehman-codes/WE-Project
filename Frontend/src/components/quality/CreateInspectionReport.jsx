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
    const [inspectionDate, setInspectionDate] = useState(null)

    const handleSubmit = (event) => {
        event.preventDefault()
        // Handle form submission here
        console.log('Form submitted')
    }

    return (
        <div>
            <Card className="w-[95%] h-[90%] m-4 bg-white rounded-lg shadow-lg">
                <CardHeader>
                    <CardTitle className="text-xl font-bold">Create Inspection Report</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="inspectionItem">Inspection Item</Label>
                            <Select required>
                                <SelectTrigger id="inspectionItem">
                                    <SelectValue placeholder="Select item" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="item1">Item 1</SelectItem>
                                    <SelectItem value="item2">Item 2</SelectItem>
                                    <SelectItem value="item3">Item 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="supplier">Supplier name</Label>
                            <Select required>
                                <SelectTrigger id="supplier">
                                    <SelectValue placeholder="Select supplier" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="supplier1">Supplier 1</SelectItem>
                                    <SelectItem value="supplier2">Supplier 2</SelectItem>
                                    <SelectItem value="supplier3">Supplier 3</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="inspectionDate">Inspection date</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={`w-full justify-start text-left font-normal ${!inspectionDate && "text-muted-foreground"}`}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {inspectionDate ? format(inspectionDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={inspectionDate}
                                        onSelect={setInspectionDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="qualityCheck">Quality check</Label>
                            <Select required>
                                <SelectTrigger id="qualityCheck">
                                    <SelectValue placeholder="Select quality check" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="pass">Pass</SelectItem>
                                    <SelectItem value="fail">Fail</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="quantityCheck">Quantity check</Label>
                            <Select required>
                                <SelectTrigger id="quantityCheck">
                                    <SelectValue placeholder="Select quantity check" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="correct">Correct</SelectItem>
                                    <SelectItem value="incorrect">Incorrect</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="inspector">Inspector</Label>
                            <Input id="inspector" type="text" value="John Doe" disabled />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Notes/Issues</Label>
                            <Textarea id="notes"></Textarea>
                        </div>
                    </form>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full">Create</Button>
                </CardFooter>
            </Card>
        </div>
    )
};

export default CreateInspectionReport;