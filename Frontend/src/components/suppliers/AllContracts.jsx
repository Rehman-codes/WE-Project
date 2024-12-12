import { useState, useEffect } from "react"
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
    const [contracts, setContracts] = useState([])

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch contracts from the API when the component mounts
    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const response = await fetch(`${API_URL}/contract/all`)
                if (response.ok) {
                    const data = await response.json()
                    setContracts(data)
                    console.log(data)
                } else {
                    alert("Failed to load contracts.")
                }
            } catch (error) {
                console.error("Error fetching contracts:", error)
                alert("Error fetching contracts.")
            }
        }

        fetchContracts()
    }, [])

    // Update contract in the local state and send API request to update the database
    const handleChange = (id, field, value) => {
        setContracts((prevContracts) => {
            const updatedContracts = prevContracts.map((contract) =>
                contract._id === id
                    ? {
                        ...contract,
                        [field]: value,
                    }
                    : contract
            )
            const updatedContract = updatedContracts.find((contract) => contract._id === id)
            handleUpdate(updatedContract) // Pass the updated contract directly
            return updatedContracts
        })
    }

    // API call to update contract
    const handleUpdate = async (updatedContract) => {
        try {
            const response = await fetch(`${API_URL}/contract/${updatedContract._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedContract),
            })

            if (response.ok) {
                console.log("Contract updated successfully")
            } else {
                alert("Failed to update the contract")
            }
        } catch (error) {
            console.error("Error updating contract:", error)
            alert("Error updating the contract")
        }
    }

    // API call to delete contract
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/contract/${id}`, {
                method: "DELETE",
            })

            if (response.ok) {
                setContracts((prevContracts) => prevContracts.filter((contract) => contract._id !== id))
                console.log("Contract deleted successfully")
            } else {
                alert("Failed to delete contract")
            }
        } catch (error) {
            console.error("Error deleting contract:", error)
            alert("Error deleting contract")
        }
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
                        {contracts.map((contract, index) => (
                            <TableRow key={contract._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Select
                                        value={contract.supplierName}
                                        onValueChange={(value) => handleChange(contract._id, "supplierName", value)}
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
                                        value={contract.contractTitle}
                                        onChange={(e) => handleChange(contract._id, "contractTitle", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={contract.startDate}
                                        onSelect={(date) => handleChange(contract._id, "startDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <DatePicker
                                        date={contract.endDate}
                                        onSelect={(date) => handleChange(contract._id, "endDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={contract.termsAndConditions}
                                        onChange={(e) => handleChange(contract._id, "termsAndConditions", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(contract._id)}>
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
