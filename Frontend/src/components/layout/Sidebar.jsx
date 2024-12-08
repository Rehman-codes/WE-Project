import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Package, LayoutDashboard, LogOut, ChevronLeft, ChevronRight, ShoppingCart, Truck, Shield, PieChart } from 'lucide-react';

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', to: '/dashboard' },
    { icon: Package, label: 'Inventory', to: '/inventory' },
    { icon: ShoppingCart, label: 'Orders', to: '/order' },
    { icon: Truck, label: 'Suppliers', to: '/supplier' },
    { icon: Shield, label: 'Quality', to: '/quality' },
    { icon: PieChart, label: 'Analytics', to: '/analytics' },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <aside
      className={`shadow h-screen bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-r border-border flex flex-col justify-between py-6 transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'
        }`}
    >
      <div className="flex flex-col gap-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`p-2 hover:bg-accent rounded-full self-end mr-4 transition-transform duration-300 ${isCollapsed ? '-rotate-180' : ''
            }`}
        >
          {isCollapsed ? <ChevronRight size={24} /> : <ChevronLeft size={24} />}
        </button>

        <nav className="flex flex-col gap-2 px-4">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className={`flex items-center gap-4 p-3 rounded-lg text-foreground/60 hover:text-foreground transition-all duration-200 ease-in-out ${activeItem === index ? 'bg-accent text-foreground' : 'hover:bg-accent/50'
                } ${isCollapsed ? 'justify-center' : ''}`}
              onClick={() => setActiveItem(index)}
            >
              <item.icon className={`w-6 h-6 transition-all duration-200 ${activeItem === index ? 'text-primary' : ''
                }`} />
              {!isCollapsed && (
                <span className={`transition-all duration-200 ${activeItem === index ? 'font-semibold' : ''
                  }`}>
                  {item.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <button
        className={`flex items-center gap-4 p-3 mx-4 rounded-lg text-foreground/60 hover:text-foreground hover:bg-accent/50 transition-all duration-200 ease-in-out ${isCollapsed ? 'justify-center' : ''
          }`}
      >
        <LogOut className="w-6 h-6" />
        {!isCollapsed && <span>Logout</span>}
      </button>
    </aside>
  );
}

export default Sidebar;
