/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
 */
/* import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { router } from './router'; 

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
); */
/* import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
 */
import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; 
import { router } from './router'; 

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);