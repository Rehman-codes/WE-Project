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
import Contracts from './components/suppliers/Contracts';

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
          { path: "add", element: <AddItem /> },
          { path: "all", element: <AllItems /> },
          { path: "adjustments", element: <Adjustments /> },
        ],
      },

      // Order Management
      {
        path: "orders",
        element: <Orders />,
        children: [
          { path: "create", element: <CreateOrder /> },
          { path: "all", element: <AllOrders /> },
        ],
      },

      // Supplier Management
      {
        path: "suppliers",
        element: <Suppliers />,
        children: [
          { path: "add", element: <AddSupplier /> },
          { path: "all", element: <AllSuppliers /> },
          { path: "contracts", element: <Contracts /> },
        ],
      },

      // Quality Control
      {
        path: "quality",
        element: <Quality />,
        children: [
          { path: "create-report", element: <CreateInspectionReport /> },
          { path: "all-reports", element: <AllInspectionReports /> },
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
