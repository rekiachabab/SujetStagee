import React, { useEffect, useRef } from 'react';
import '../index.css'; 
import { Link, Outlet } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';

const Layout = () => {
 
  const toggleRef = useRef(null);
  const navMenuRef = useRef(null);

  useEffect(() => {
    const toggle = toggleRef.current;
    const navMenu = navMenuRef.current;

   
    if (toggle && navMenu) {
     
      const handleClick = () => {
       
        navMenu.classList.toggle('show-menu');
        toggle.classList.toggle('show-icon');
      };

     
      toggle.addEventListener('click', handleClick);

      
      return () => {
        toggle.removeEventListener('click', handleClick);
      };
    }
  }, []); 

  return (
    <>
      <header className="header">
        <nav className="nav container">
          <div className="nav__data">
            <a href="#" className="nav__logo">
              <i className="ri-funds-line" style={{ fontSize: '40px' }}></i> Gestion De Stock
            </a>
            <div className="nav__toggle" ref={toggleRef}>
              <i className="ri-menu-line nav__burger"></i>
              <i className="ri-close-line nav__close"></i>
            </div>
          </div>

          <div className="nav__menu" ref={navMenuRef}>
            <ul className="nav__list">
              <li>
                <Link to={'/'} className="nav__link">Home</Link>
                
              </li>
              <li>
              <Link to={'/Fournisseur'} className="nav__link">Fournisseur</Link>
                
              </li>
              <li>
              <Link to={'/Departement'} className="nav__link">Département</Link>
                
              </li>
              <li>
              <Link to={'/Fonctionnaire'} className="nav__link">Fonctionnaire</Link>

                
              </li>
              <li>
              <Link to={'/Categories'} className="nav__link">Categories</Link>

               
              </li>
              <li>
              <Link to={'/Articles'} className="nav__link">Articles</Link>

                
              </li>
              <li className="dropdown__item">
                <div className="nav__link">
                  Stock <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                </div>
                <ul className="dropdown__menu">
                  <li>
                    <Link to={"/Entrée"} className="dropdown__link">
                      <i className="ri-arrow-right-down-fill"></i>Entree
                    </Link>
                  </li>
                  <li>
                    <Link to={"/Sortie"} className="dropdown__link">
                      <i className="ri-arrow-left-up-fill"></i>Sortie
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <section>
        <Outlet />
      </section>

     
    </>
  );
};

export default Layout;
