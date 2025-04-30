
import React, { useEffect, useRef, useState } from 'react';

import { Link, Outlet, useNavigate } from 'react-router-dom';
import '../styles/style.css';
import 'remixicon/fonts/remixicon.css';
import { useAuth } from '../context/AuthContext';

const Layout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const toggleRef = useRef(null);
  const navMenuRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (user === undefined) return;
    if (!user) {
      navigate('/login');
    } else {
      setLoading(false);
    }
  }, [user, navigate]);

  useEffect(() => {
    const toggle = toggleRef.current;
    const navMenu = navMenuRef.current;
    const dropdown = dropdownRef.current;

    const handleToggleClick = () => {
      navMenu.classList.toggle('show-menu');
      toggle.classList.toggle('show-icon');
    };

    const handleDropdownClick = () => {
      dropdown.classList.toggle('show-dropdown');
    };

    const closeMenu = () => {
      navMenu.classList.remove('show-menu');
      toggle.classList.remove('show-icon');
      dropdown.classList.remove('show-dropdown');
    };

    if (toggle && navMenu && dropdown) {
      toggle.addEventListener('click', handleToggleClick);

      const dropdownToggle = dropdown.querySelector('.nav__link');
      dropdownToggle.addEventListener('click', handleDropdownClick);

      const allLinks = navMenu.querySelectorAll('.nav__link, .dropdown__link');
      allLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
      });

      return () => {
        toggle.removeEventListener('click', handleToggleClick);
        dropdownToggle.removeEventListener('click', handleDropdownClick);
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
              <li><Link to="/Fournisseur" className="nav__link">Fournisseur</Link></li>
              <li><Link to="/Departement" className="nav__link">Département</Link></li>
              <li><Link to="/Fonctionnaire" className="nav__link">Fonctionnaire</Link></li>
              <li><Link to="/Categories" className="nav__link">Categories</Link></li>
              <li><Link to="/Articles" className="nav__link">Articles</Link></li>

              <li className="dropdown__item" ref={dropdownRef}>
                <div className="nav__link dropdown__toggle">
                  Stock <i className="ri-arrow-down-s-line dropdown__arrow"></i>
                </div>
                <ul className="dropdown__menu">
                  <li>
                    <Link to="/Entree" className="dropdown__link">
                      <i className="ri-arrow-right-down-fill"></i> Entree
                    </Link>
                  </li>
                  <li>
                    <Link to="/Sortie" className="dropdown__link">
                      <i className="ri-arrow-left-up-fill"></i> Sortie
                    </Link>
                  </li>
                </ul>
              </li>

              <li>
                <button
                  onClick={() => {
                    logout();
                    navigate('/login');
                  }}
                  className="nav__link"
                  style={{ background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <i className="ri-logout-box-r-line"></i> Logout
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <section>
        {!loading && <Outlet />}
      </section>
    </>
  );
};

export default Layout;
