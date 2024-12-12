import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

const itemNames = ["Item A", "Item B", "Item C", "Item D", "Item E"];
const supplierNames = ["Supplier X", "Supplier Y", "Supplier Z"];
const qualityCheckOptions = ["Pass", "Fail"];
const quantityCheckOptions = ["Correct", "Incorrect"];

const AllInspectionReports = () => {
    const [reports, setReports] = useState([]);

    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch inspection reports from the API when the component mounts
    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(`${API_URL}/inspectionReport/all`);
                if (response.ok) {
                    const data = await response.json();
                    setReports(data);
                    console.log(data);

                } else {
                    alert("Failed to load inspection reports.");
                }
            } catch (error) {
                console.error("Error fetching inspection reports:", error);
                alert("Error fetching inspection reports.");
            }
        };

        fetchReports();
    }, []);

    // Update inspection report in local state and send API request to update the database
    const handleChange = (id, field, value) => {
        setReports((prevReports) => {
            const updatedReports = prevReports.map((report) =>
                report._id === id
                    ? { ...report, [field]: value }
                    : report
            );
            const updatedReport = updatedReports.find((report) => report._id === id); // Find the updated report
            handleUpdate(updatedReport); // Pass the updated report directly
            return updatedReports;
        });
    };

    // API call to update inspection report
    const handleUpdate = async (updatedReport) => {
        try {
            const response = await fetch(`${API_URL}/inspectionReport/${updatedReport._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedReport),
            });

            if (response.ok) {
                console.log("Inspection report updated successfully");
            } else {
                alert("Failed to update inspection report");
            }
        } catch (error) {
            console.error("Error updating inspection report:", error);
            alert("Error updating inspection report");
        }
    };



    // API call to delete inspection report
    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${API_URL}/inspectionReport/${id}`, {
                method: "DELETE",
            });

            if (response.ok) {
                setReports((prevReports) => prevReports.filter((report) => report._id !== id));
                console.log("Inspection report deleted successfully");
            } else {
                alert("Failed to delete inspection report");
            }
        } catch (error) {
            console.error("Error deleting inspection report:", error);
            alert("Error deleting inspection report");
        }
    };

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
                        {reports.map((report, index) => (
                            <TableRow key={report._id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                    <Select
                                        value={report.inspectionItem}
                                        onValueChange={(value) => handleChange(report._id, "inspectionItem", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{report.inspectionItem}</SelectValue>
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
                                        value={report.supplier}
                                        onValueChange={(value) => handleChange(report._id, "supplier", value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue>{report.supplier}</SelectValue>
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
                                        onSelect={(date) => handleChange(report._id, "inspectionDate", date)}
                                    />
                                </TableCell>
                                <TableCell>
                                    <Select
                                        value={report.qualityCheck}
                                        onValueChange={(value) => handleChange(report._id, "qualityCheck", value)}
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
                                        onValueChange={(value) => handleChange(report._id, "quantityCheck", value)}
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
                                        onChange={(e) => handleChange(report._id, "inspector", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        value={report.notes}
                                        onChange={(e) => handleChange(report._id, "notes", e.target.value)}
                                        className="w-full"
                                    />
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button variant="destructive" onClick={() => handleDelete(report._id)}>
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
    );
}

export default AllInspectionReports;
