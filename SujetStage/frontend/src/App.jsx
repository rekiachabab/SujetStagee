import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from './context/AuthContext';

import EntreeLine from "./pages/EntreeLine";
import AfficherEntree from "./pages/AfficherEntree";
import Articles from "./pages/Articles";
import Categories from "./pages/Categories";
import Sortie from "./pages/Sortie";
import Layout from "./layouts/Layout"; 
import Departement from "./pages/Departement";
import Fonctionnaire from "./pages/Fonctionnaire";
import Fournisseur from "./pages/Fournisseur";
import Entree from "./pages/Entree";
import SortieLine from "./pages/SortieLine";
import AfficherSortie from "./pages/AfficherSortie";
import Home from "./pages/Home";
import ResetPassword from "./pages/ResetPassword";
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import BarcodesSortie from './pages/BarcodesSortie';

import PrivateRoute from './components/PrivateRoute';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <Router>
      <Routes>

        {/* Public routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" replace />} />
        <Route path="/register" element={!user ? <Register /> : <Navigate to="/" replace />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Private routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Categories" element={<Categories />} />
            <Route path="Articles" element={<Articles />} />
            <Route path="Entree" element={<Entree />} />
            <Route path="Fournisseur" element={<Fournisseur />} />
            <Route path="Fonctionnaire" element={<Fonctionnaire />} />
            <Route path="Departement" element={<Departement />} />
            <Route path="Sortie" element={<Sortie />} />
            <Route path="SortieLine/:id" element={<SortieLine />} />
            <Route path="EntreeLine/:id" element={<EntreeLine />} />
            <Route path="afficher-entree/:id" element={<AfficherEntree />} />
            <Route path="afficher-sortie/:id" element={<AfficherSortie />} />
            <Route path="barcodes-sortie/:id" element={<BarcodesSortie />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
}

export default App;