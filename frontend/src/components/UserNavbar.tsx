import React from 'react';
import CardNav from './CardNav';
import { items } from './CardNav';
import { useUser } from '../contexts/UserContext';

const UserNavbar: React.FC = () => {
  const { user, logout, isLoggedIn } = useUser();

  const handleLogout = () => {
    logout();
    window.location.href = '/';
  };

  return (
    <CardNav
      logo="/vite.svg"
      logoAlt="Company Logo"
      items={items}
      baseColor="#fff"
      menuColor="#000"
      buttonBgColor="#060010"
      buttonTextColor="#fff"
      ease="power3.out"
      customButton={
        isLoggedIn ? (
          <div className="flex items-center gap-3">
            <span className="text-black text-sm font-medium">
              Welcome, {user?.username}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="card-nav-cta-button hidden md:inline-flex border-0 rounded-[calc(0.75rem-0.2rem)] px-4 h-full font-medium cursor-target transition-colors duration-300 justify-center items-center text-center"
            style={{ backgroundColor: '#060010', color: '#fff' }}
            onClick={() => window.location.href = '/signup'}
          >
            Get Started
          </button>
        )
      }
    />
  );
};

export default UserNavbar;
