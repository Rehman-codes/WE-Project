import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

const itemNames = ["Item A", "Item B", "Item C", "Item D", "Item E"]
const supplierNames = ["Supplier X", "Supplier Y", "Supplier Z"]
const qualityCheckOptions = ["Pass", "Fail"]
const quantityCheckOptions = ["Correct", "Incorrect"]

const AllInspectionReports = () => {
    const [reports, setReports] = useState([
        {
            id: 1,
            itemName: "Item A",
            supplierName: "Supplier X",
            inspectionDate: new Date(),
            qualityCheck: "Pass",
            quantityCheck: "Correct",
            inspector: "Inspector 1",
            notes: "",
        },
    ])

    const handleChange = (id, field, value) => {
        setReports((prevReports) =>
            prevReports.map((report) =>
                report.id === id
                    ? {
                        ...report,
                        [field]: value,
                    }
                    : report
            )
        )
    }

    const handleDelete = (id) => {
        setReports((prevReports) => prevReports.filter((report) => report.id !== id))
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[100%] h-[95%] m-1">
                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>Item Name</TableHead>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead>Inspection Date</TableHead>
                            <TableHead>Quality Check</TableHead>
                            <TableHead>Quantity Check</TableHead>
                            <TableHead>Inspector</TableHead>
                            <TableHead>Notes/Issues</TableHead>
                            <TableHead className="text-right">Operation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {reports.map((report) => (
                            <TableRow key={report.id}>
                                <TableCell>{report.id}</TableCell>
                                <TableCell>
                                    <Select
                                        value={report.itemName}
                                        onValueChange={(value) => handleChange(report.id, "itemName", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{report.itemName}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {itemNames.map((item) => (
                                                <SelectItem key={item} value={item}>
                                                    {item}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={report.supplierName}
                                        onValueChange={(value) => handleChange(report.id, "supplierName", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{report.supplierName}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {supplierNames.map((supplier) => (
                                                <SelectItem key={supplier} value={supplier}>
                                                    {supplier}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={report.inspectionDate}
                                        onSelect={(date) => handleChange(report.id, "inspectionDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={report.qualityCheck}
                                        onValueChange={(value) => handleChange(report.id, "qualityCheck", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{report.qualityCheck}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {qualityCheckOptions.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={report.quantityCheck}
                                        onValueChange={(value) => handleChange(report.id, "quantityCheck", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{report.quantityCheck}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {quantityCheckOptions.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={report.inspector}
                                        readOnly
                                        className="w-full bg-gray-100"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={report.notes}
                                        onChange={(e) => handleChange(report.id, "notes", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(report.id)}>
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

function DatePicker({ date, onSelect }) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date || undefined} onSelect={onSelect} initialFocus />
            </PopoverContent>
        </Popover>
    )
};

export default AllInspectionReports;