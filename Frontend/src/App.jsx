import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Layout from './Layout';

// Pages
import Inventory from './pages/Inventory';
import Orders from './pages/Orders';
import Suppliers from './pages/Suppliers';
import Quality from './pages/Quality';
import Analytics from './pages/Analytics';
import WeatherDashboard from './components/dashboard/WeatherDashboard';

// Inventory Components
import AddItem from './components/inventory/AddItem';
import AllItems from './components/inventory/AllItems';
import Adjustments from './components/inventory/Adjustments';

// Order Components
import CreateOrder from './components/orders/CreateOrder';
import AllOrders from './components/orders/AllOrders';

// Supplier Components
import AddSupplier from './components/suppliers/AddSupplier';
import AllSuppliers from './components/suppliers/AllSuppliers';
import CreateContract from './components/suppliers/CreateContract';
import AllContracts from './components/suppliers/AllContracts';

// Quality Components
import CreateInspectionReport from './components/quality/CreateInspectionReport';
import AllInspectionReports from './components/quality/AllInspectionReports';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      // Dashboard
      { path: "dashboard", element: <WeatherDashboard /> },

      // Inventory Management
      {
        path: "inventory",
        element: <Inventory />,
        children: [
          { index: true, element: <AddItem /> }, // Default route for inventory
          { path: "add", element: <AddItem /> },
          { path: "all", element: <AllItems /> },
          { path: "adjustments", element: <Adjustments /> },
        ],
      },

      // Order Management
      {
        path: "order",
        element: <Orders />,
        children: [
          { index: true, element: <CreateOrder /> },
          { path: "create", element: <CreateOrder /> },
          { path: "all", element: <AllOrders /> },
        ],
      },

      // Supplier Management
      {
        path: "supplier",
        element: <Suppliers />,
        children: [
          { index: true, element: <AddSupplier /> },
          { path: "add", element: <AddSupplier /> },
          { path: "all", element: <AllSuppliers /> },
          { path: "create", element: <CreateContract /> },
          { path: "view", element: <AllContracts /> },
        ],
      },

      // Quality Control
      {
        path: "quality",
        element: <Quality />,
        children: [
          { index: true, element: <CreateInspectionReport /> },
          { path: "create", element: <CreateInspectionReport /> },
          { path: "all", element: <AllInspectionReports /> },
        ],
      },

      // Analytics
      { path: "analytics", element: <Analytics /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
