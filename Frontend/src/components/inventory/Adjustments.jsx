import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Adjustments = () => {
    const [issues, setIssues] = useState([]);
    const API_URL = import.meta.env.VITE_API_URL;

    // Fetch adjustments from the API
    const fetchAdjustments = async () => {
        try {
            const response = await fetch(`${API_URL}/adjustment/all`);
            if (!response.ok) {
                throw new Error('Failed to fetch adjustments');
            }
            const data = await response.json();
            setIssues(data);
        } catch (error) {
            console.error("Error fetching adjustments:", error.message);
        }
    };

    const toggleResolveIssue = async (id, currentResolvedStatus) => {
        try {
            const response = await fetch(`${API_URL}/adjustment/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resolved: !currentResolvedStatus }),
            });
            if (!response.ok) {
                throw new Error('Failed to update adjustment');
            }
            const updatedIssue = await response.json();
            setIssues(issues.map(issue => issue._id === id ? updatedIssue : issue));
        } catch (error) {
            console.error("Error updating adjustment:", error.message);
        }
    };

    const removeIssue = async (id) => {
        try {
            const response = await fetch(`${API_URL}/adjustment/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Failed to delete adjustment');
            }
            setIssues(issues.filter(issue => issue._id !== id));
        } catch (error) {
            console.error("Error deleting adjustment:", error.message);
        }
    };

    useEffect(() => {
        fetchAdjustments();
    }, []);

    return (
        <div className='flex justify-center flex-wrap gap-5'>
            {issues.map(issue => (
                <Card
                    key={issue._id}
                    style={{
                        padding: '20px',
                        width: '250px',
                        height: 'auto',
                        boxSizing: 'border-box',
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    <div
                        style={{
                            color: issue.resolved ? '#999' : '#000',
                            textDecoration: issue.resolved ? 'line-through' : 'none'
                        }}
                    >
                        <div className='mb-2'><strong>Issue type:</strong><span className="text-gray-500"> {issue.type}</span></div>
                        <div className='mb-2'><strong>Item name:</strong><span className="text-gray-500"> {issue.name}</span></div>
                        <div className='mb-2'><strong>Quantity affected:</strong><span className="text-gray-500"> {issue.quantity}</span></div>
                        <div className='mb-2'><strong>Priority:</strong><span className="text-gray-500"> {issue.priority}</span></div>
                        <div className='mb-2'><strong>Date reported:</strong><span className="text-gray-500"> {new Date(issue.date).toLocaleDateString()}</span></div>
                        <div className='mb-2'><strong>Reported by:</strong><span className="text-gray-500"> {issue.reportedBy}</span></div>
                        <div className='mb-2'><strong>Location:</strong><span className="text-gray-500"> {issue.location}</span></div>
                    </div>
                    <div className='flex flex-row justify-center items-center mt-4 gap-2'>
                        <Button
                            onClick={() => toggleResolveIssue(issue._id, issue.resolved)}
                            style={{
                                backgroundColor: issue.resolved ? '#5cb85c' : '#272e3f',
                                color: '#fff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            {issue.resolved ? 'Retain' : 'Resolve'}
                        </Button>
                        <Button
                            onClick={() => removeIssue(issue._id)}
                            style={{
                                backgroundColor: '#ef5656',
                                color: '#fff',
                                border: 'none',
                                padding: '8px 16px',
                                borderRadius: '4px',
                                cursor: 'pointer'
                            }}
                        >
                            Remove
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default Adjustments;
