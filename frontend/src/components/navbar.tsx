import React, { useEffect, useState } from 'react';
import './navbar.css';
import ShinyText from './ShinyText';

interface NavbarProps {
  className?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className = '' }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${className}`.trim()}>
      <div className="navbar-container">
        <div className="navbar-brand">
           <ShinyText
                  text="MZ Codes"
                  disabled={false}
                  speed={3}
                  className="custom-class"
                />
        </div>
        
        <div className="navbar-menu">
          <ul className="navbar-links">
            <li className="navbar-item">
              <a href="#home" className="navbar-link">Home</a>
            </li>
            <li className="navbar-item">
              <a href="#about" className="navbar-link">About</a>
            </li>
            <li className="navbar-item">
              <a href="#projects" className="navbar-link">Projects</a>
            </li>
            <li className="navbar-item">
              <a href="#contact" className="navbar-link">Contact</a>
            </li>
          </ul>
        </div>
        
        <div className="navbar-actions">
          <button className="navbar-button primary">
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
