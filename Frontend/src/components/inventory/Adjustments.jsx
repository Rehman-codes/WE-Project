import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Adjustments = () => {
    const [issues, setIssues] = useState([
        { id: 1, type: 'Type 1', name: 'Item 1', quantity: 10, priority: 'High', date: '2023-10-01', reportedBy: 'User 1', location: 'Location 1', resolved: false },
        { id: 2, type: 'Type 2', name: 'Item 2', quantity: 5, priority: 'Medium', date: '2023-10-02', reportedBy: 'User 2', location: 'Location 2', resolved: false },
    ]);

    const toggleResolveIssue = (id) => {
        setIssues(issues.map(issue => issue.id === id ? { ...issue, resolved: !issue.resolved } : issue));
    };

    const removeIssue = (id) => {
        setIssues(issues.filter(issue => issue.id !== id));
    };

    return (
        <div className='flex justify-center flex-wrap gap-5'>
            {issues.map(issue => (
                <Card
                    key={issue.id}
                    style={{
                        padding: '20px',
                        width: '250px',
                        height: '300px',
                        boxSizing: 'border-box',
                        transition: 'opacity 0.3s ease'
                    }}
                >
                    <div
                        style={{
                            color: issue.resolved ? '#999' : '#000', // Gray out text if resolved
                            textDecoration: issue.resolved ? 'line-through' : 'none'
                        }}
                    >
                        <div className='mb-2'><strong>Issue type:</strong><span className="text-gray-500"> {issue.type}</span></div>
                        <div className='mb-2'><strong>Item name:</strong><span className="text-gray-500"> {issue.name}</span></div>
                        <div className='mb-2'><strong>Quantity affected:</strong><span className="text-gray-500"> {issue.quantity}</span></div>
                        <div className='mb-2'><strong>Priority:</strong><span className="text-gray-500"> {issue.priority}</span></div>
                        <div className='mb-2'><strong>Date reported:</strong><span className="text-gray-500"> {issue.date}</span></div>
                        <div className='mb-2'><strong>Reported by:</strong><span className="text-gray-500"> {issue.reportedBy}</span></div>
                        <div className='mb-2'><strong>Location:</strong><span className="text-gray-500"> {issue.location}</span></div>
                    </div>
                    <div className='flex flex-row justify-center items-center mt-4 gap-2'>
                        <Button
                            onClick={() => toggleResolveIssue(issue.id)}
                            style={{
                                backgroundColor: issue.resolved ? '#5cb85c' : '#272e3f', // Green for "Retain"
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
                            onClick={() => removeIssue(issue.id)}
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
