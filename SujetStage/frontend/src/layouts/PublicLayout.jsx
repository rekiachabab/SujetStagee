import { Link, Outlet } from 'react-router-dom';
import React, { useEffect, useRef } from 'react';


export default function PublicLayout() {

 
  const toggleRef = useRef(null);
  const navMenuRef = useRef(null);
 

 
  useEffect(() => {
    const toggle = toggleRef.current;
    const navMenu = navMenuRef.current;
    

    const handleToggleClick = () => {
      navMenu.classList.toggle('show-menu');
      toggle.classList.toggle('show-icon');
    };

   

    const closeMenu = () => {
      navMenu.classList.remove('show-menu');
      toggle.classList.remove('show-icon');
      
    };

    if (toggle && navMenu ) {
      toggle.addEventListener('click', handleToggleClick);

  
      const allLinks = navMenu.querySelectorAll('.nav__link, .dropdown__link');
      allLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      return () => {
        toggle.removeEventListener('click', handleToggleClick);
       
        allLinks.forEach(link => {
          link.removeEventListener('click', closeMenu);
        });
      };
    }
  }, []);

  return (
    <>
      <header className="header">
        <nav className="nav container">
           <div className="nav__data">
                      <Link to="/" className="nav__logo">
                        <i className="ri-funds-line" style={{ fontSize: '40px' }}></i> Gestion De Stock
                      </Link>
                      <div className="nav__toggle" ref={toggleRef}>
                        <i className="ri-menu-line nav__burger"></i>
                        <i className="ri-close-line nav__close"></i>
                      </div>
                    </div>
                    <div className="nav__menu" ref={navMenuRef}>
          <ul className="nav__list">
            <li><Link to="/" className="nav__link">Home</Link></li>
            <li><Link to="/login" className="nav__link">Login</Link></li>
            <li><Link to="/register" className="nav__link">Register</Link></li>
          </ul>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}