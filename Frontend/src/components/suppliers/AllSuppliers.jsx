import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const performanceOptions = ["Excellent", "Good", "Average", "Poor"];

const AllSuppliers = () => {
    const [suppliers, setSuppliers] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch suppliers from the API when the component mounts
    useEffect(() => {
        const fetchSuppliers = async () => {
            try {
                const response = await fetch(`${API_URL}/supplier/all`);
                if (response.ok) {
                    const data = await response.json();
                    setSuppliers(data);
                    console.log(data);
                } else {
                    alert("Failed to load suppliers.");
                }
            } catch (error) {
                console.error("Error fetching suppliers:", error);
                alert("Error fetching suppliers.");
            }
        };

        fetchSuppliers();
    }, []);

    // Update supplier in the local state and send API request to update the database
    const handleChange = (id, field, value) => {
        setSuppliers((prevSuppliers) => {
            const updatedSuppliers = prevSuppliers.map((supplier) =>
                supplier._id === id
                    ? {
                        ...supplier,
                        [field]: value,
                    }
                    : supplier
            );
            const updatedSupplier = updatedSuppliers.find((supplier) => supplier._id === id);
            handleUpdate(updatedSupplier); // Pass the updated supplier directly
            return updatedSuppliers;
        });
    };

    // API call to update supplier
    const handleUpdate = async (updatedSupplier) => {
        try {
            const response = await fetch(`${API_URL}/supplier/${updatedSupplier._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedSupplier),
            });

            if (response.ok) {
                console.log("Supplier updated successfully");
            } else {
                alert("Failed to update the supplier");
            }
        } catch (error) {
            console.error("Error updating supplier:", error);
            alert("Error updating the supplier");
        }
    };

    // API call to delete supplier
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/supplier/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setSuppliers((prevSuppliers) => prevSuppliers.filter((supplier) => supplier._id !== id));
                console.log("Supplier deleted successfully");
            } else {
                alert("Failed to delete supplier");
            }
        } catch (error) {
            console.error("Error deleting supplier:", error);
            alert("Error deleting supplier");
        }
    };

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
                        {suppliers.map((supplier, index) => (
                            <TableRow key={supplier._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.supplierName}
                                        onChange={(e) => handleChange(supplier._id, "supplierName", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.email}
                                        onChange={(e) => handleChange(supplier._id, "email", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.phone}
                                        onChange={(e) => handleChange(supplier._id, "phone", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={supplier.address}
                                        onChange={(e) => handleChange(supplier._id, "address", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Input
                                        value={supplier.companyName}
                                        onChange={(e) => handleChange(supplier._id, "companyName", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={supplier.performance}
                                        onValueChange={(value) => handleChange(supplier._id, "performance", value)}
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
                                    <Button variant="destructive" onClick={() => handleDelete(supplier._id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default AllSuppliers;
