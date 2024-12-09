import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const supplierNames = ["Supplier X", "Supplier Y", "Supplier Z"]
const performanceOptions = ["Excellent", "Good", "Average", "Poor"]

const AllSuppliers = () => {
    const [suppliers, setSuppliers] = useState([
        {
            id: 1,
            supplierName: "Supplier X",
            email: "supplierx@example.com",
            phone: "123-456-7890",
            address: "123 Supplier St, Supplier City",
            company: "Supplier Company X",
            performance: "Excellent",
        },
    ])

    const handleChange = (id, field, value) => {
        setSuppliers((prevSuppliers) =>
            prevSuppliers.map((supplier) =>
                supplier.id === id
                    ? {
                        ...supplier,
                        [field]: value,
                    }
                    : supplier
            )
        )
    }

    const handleDelete = (id) => {
        setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier.id !== id))
    }

    return (
        <div className="flex justify-center items-center">
            <div className="w-[100%] h-[95%] m-1">
                <Table className="border rounded-lg">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[50px]">No</TableHead>
                            <TableHead>Supplier Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Address</TableHead>
                            <TableHead>Company</TableHead>
                            <TableHead>Performance</TableHead>
                            <TableHead className="text-right">Operation</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {suppliers.map((supplier) => (
                            <TableRow key={supplier.id}>
                                <TableCell>{supplier.id}</TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.supplierName}
                                        onChange={(e) => handleChange(supplier.id, "supplierName", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.email}
                                        onChange={(e) => handleChange(supplier.id, "email", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.phone}
                                        onChange={(e) => handleChange(supplier.id, "phone", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={supplier.address}
                                        onChange={(e) => handleChange(supplier.id, "address", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.company}
                                        onChange={(e) => handleChange(supplier.id, "company", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={supplier.performance}
                                        onValueChange={(value) => handleChange(supplier.id, "performance", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{supplier.performance}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent>
                                            {performanceOptions.map((option) => (
                                                <SelectItem key={option} value={option}>
                                                    {option}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(supplier.id)}>
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

export default AllSuppliers