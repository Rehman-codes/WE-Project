import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Panel from './components/layout/Panel';

const Layout = () => {
    return (
        <div className="flex h-screen w-screen">
            <Sidebar />
            <Panel>
                <Outlet />
            </Panel>
        </div>
    );
};

export default Layout;
