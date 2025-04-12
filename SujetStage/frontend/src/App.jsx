import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import EntreeLine from "./pages/EntreeLine";
import AfficherEntree from "./pages/AfficherEntree";
import Articles from "./pages/Articles";
import Categories from "./pages/Categories";

import Layout from "./layouts/layout"; 
import Departement from "./pages/Departement";
import Fonctionnaire from "./pages/Fonctionnaire";
import Fournisseur from "./pages/Fournisseur";
import Entree from "./pages/Entree";

import ErrorBoundary from './pages/ErrorBoundary';

import Home from "@/pages/Home";

function App() {
  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} /> 
          <Route path="/Categories" element={<Categories />} />
          <Route path="/Entrée" element={<Entree />} />
          <Route path="/Fournisseur" element={<Fournisseur />} />
          <Route path="/Fonctionnaire"  element={
    <ErrorBoundary>
      <Fonctionnaire />
    </ErrorBoundary>
  } />
          <Route path="/Departement" element={<Departement />} />
          
         
          <Route path="entreeline/:id" element={<EntreeLine />} />
          <Route path="/afficher-entree/:id" element={<AfficherEntree />} />
         
          <Route path="/Articles" element={<Articles />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
/* import { useState } from 'react'

import './App.css'
import { RouterProvider } from 'react-router-dom'
import {router} from "./router/index.jsx";
import { CategoriesProvider} from './CategoriesContext.jsx';


function App() {
 

  return (
    <>
     <CategoriesProvider><RouterProvider router={router}/></CategoriesProvider>
      
   
      
     
    </>
  )
}

export default App
 */