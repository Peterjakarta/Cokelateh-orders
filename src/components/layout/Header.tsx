import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export default function Header() {
  const location = useLocation();
  const { logout, hasPermission } = useAuth();
  
  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="p-2 bg-white rounded-full shadow-lg transition-transform group-hover:scale-110">
                <img 
                  src="/logocokelateh.png" 
                  alt="Cokelateh" 
                  className="w-10 h-10 object-contain"
                />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Cokelateh</h1>
                <p className="text-pink-100 text-sm">Internal Product Order System</p>
              </div>
            </Link>
            
            <div className="flex items-center gap-6">
              <nav className="flex gap-6">
                <NavLink to="/" current={location.pathname === "/"}>
                  Order Form
                </NavLink>
                {hasPermission('manage_orders') && (
                  <NavLink to="/management" current={location.pathname.includes("/management")}>
                    Management
                  </NavLink>
                )}
              </nav>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ to, current, children }: { 
  to: string; 
  current: boolean; 
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className={`px-4 py-2 rounded-lg transition-colors ${
        current
          ? 'bg-white text-purple-600 shadow-lg'
          : 'text-white hover:bg-white/10'
      }`}
    >
      {children}
    </Link>
  );
}