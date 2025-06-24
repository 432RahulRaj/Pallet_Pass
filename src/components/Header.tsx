import React, { useState } from 'react';
import { Menu, Search, X, ChevronDown, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut();
      toast.success('Successfully logged out');
      navigate('/');
    } catch (error) {
      toast.error('Failed to log out');
    }
  };

  return (
    <header className="relative bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center py-4">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div className="flex-1 lg:flex-none">
            <Link 
              to="/" 
              className="text-2xl font-serif text-center lg:text-left hover:opacity-80 transition-opacity duration-300"
            >
              PALLET PASS
            </Link>
          </div>

          <nav className="hidden lg:flex space-x-8 flex-1 justify-center">
            {[
              { to: "/exhibitions", label: "Exhibitions" },
              { to: "/collection", label: "Collection" },
              { to: "/events", label: "Events" }
            ].map((item) => (
              <Link 
                key={item.to}
                to={item.to} 
                className="nav-link flex items-center"
              >
                {item.label}
                <ChevronDown size={16} className="ml-1 transition-transform duration-300 group-hover:rotate-180" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <Search size={24} />
            </button>
            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/profile"
                  className="flex items-center text-gray-900 hover:text-gray-600 transition-colors duration-300 menu-item"
                >
                  <User size={20} className="mr-2" />
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center text-gray-900 hover:text-gray-600 transition-colors duration-300 menu-item"
                >
                  <LogOut size={20} className="mr-2" />
                  Logout
                </button>
              </div>
            ) : (
              <Link 
                to="/login" 
                className="text-gray-900 hover:text-gray-600 transition-colors duration-300 menu-item"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {[
              { to: "/exhibitions", label: "Exhibitions" },
              { to: "/collection", label: "Collection" },
              { to: "/events", label: "Events" },
              ...(user 
                ? [
                    { to: "/profile", label: "Profile" },
                    { to: "#", label: "Logout", onClick: handleLogout }
                  ]
                : [{ to: "/login", label: "Login" }]
              )
            ].map((item) => (
              <div key={item.to}>
                {item.onClick ? (
                  <button
                    onClick={item.onClick}
                    className="block w-full text-left px-3 py-2 text-gray-900 hover:bg-gray-100 transition-colors duration-300 rounded-md"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    className="block px-3 py-2 text-gray-900 hover:bg-gray-100 transition-colors duration-300 rounded-md"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white p-4 border-b search-overlay">
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search the collection"
                className="w-full p-3 border-b-2 border-black focus:outline-none text-lg transition-all duration-300 focus:border-gray-500"
                autoFocus
              />
              <X
                size={24}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer hover:rotate-90 transition-transform duration-300"
                onClick={() => setIsSearchOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}