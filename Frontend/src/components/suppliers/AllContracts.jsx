import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'

const supplierNames = ["Supplier X", "Supplier Y", "Supplier Z"]

const AllContracts = () => {
    const [contracts, setContracts] = useState([
        {
            id: 1,
            supplierName: "Supplier X",
            title: "Contract A",
            startDate: new Date(),
            endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            terms: "Terms and conditions of Contract A",
        },
    ])

    const handleChange = (id, field, value) => {
        setContracts((prevContracts) =>
            prevContracts.map((contract) =>
                contract.id === id
                    ? {
                        ...contract,
                        [field]: value,
                    }
                    : contract
            )
        )
    }

    const handleDelete = (id) => {
        setContracts((prevContracts) => prevContracts.filter((contract) => contract.id !== id))
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[100%] h-[95%] m-1">
                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead>Title</TableHead>
                            <TableHead>Start Date</TableHead>
                            <TableHead>End Date</TableHead>
                            <TableHead>Terms and Conditions</TableHead>
                            <TableHead className="text-right">Operation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {contracts.map((contract) => (
                            <TableRow key={contract.id}>
                                <TableCell>{contract.id}</TableCell>
                                <TableCell>
                                    <Select
                                        value={contract.supplierName}
                                        onValueChange={(value) => handleChange(contract.id, "supplierName", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{contract.supplierName}</SelectValue>
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
                                <TableCell>
                                    <Input
                                        value={contract.title}
                                        onChange={(e) => handleChange(contract.id, "title", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={contract.startDate}
                                        onSelect={(date) => handleChange(contract.id, "startDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={contract.endDate}
                                        onSelect={(date) => handleChange(contract.id, "endDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={contract.terms}
                                        onChange={(e) => handleChange(contract.id, "terms", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(contract.id)}>
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

export default AllContracts