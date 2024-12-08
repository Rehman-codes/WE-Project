import React from 'react';
import { Outlet } from 'react-router-dom';

const Panel = () => {
    return (
        <section id="panel" className="w-full h-screen max-w-full p-4 bg-gray-100 rounded shadow">
            <Outlet />
        </section>
    );
};

export default Panel;