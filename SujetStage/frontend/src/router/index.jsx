
import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Articles from '../pages/Articles';
import Layout from '../layouts/layout';
import Categories from '../pages/Categories';
import Sortie from '../pages/Sortie';
import Fournisseur from '../pages/Fournisseur';
import Fonctionnaire from '../pages/Fonctionnaire';
import Departement from '../pages/Departement';
import Entree from '../pages/Entree';
import Login from '../pages/Login';
import Register from '../pages/Register';
import PublicLayout from '../layouts/PublicLayout';
import EntreeLine from '../pages/EntreeLine';
import SortieLine from '../pages/SortieLine';
import AfficherSortie from '../pages/AfficherSortie';
import AfficherEntree from '../pages/AfficherEntree';
import ResetPassword from '../pages/ResetPassword'; 
import BarcodesSortie from '@/pages/BarcodesSortie';
export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/Articles',
        element: <Articles />,
      },
      {
        path: '/Categories',
        element: <Categories />,
      },
      {
        path: '/Sortie',
        element: <Sortie />,
      },
      {
        path: '/Fournisseur',
        element: <Fournisseur />,
      },
      {
        path: '/Fonctionnaire',
        element: <Fonctionnaire />,
      },
      {
        path: '/Departement',
        element: <Departement />,
      },
      {
        path: '/Entree',
        element: <Entree />,
      },
      {
        path: '/entreeline/:id',
        element: <EntreeLine />,
      },
      {
        path: '/sortieline/:id',
        element: <SortieLine />,
      },
      {
        path: '/afficher-sortie/:id',
        element: <AfficherSortie />,
      },
      {
        path: '/afficher-entree/:id',
        element: <AfficherEntree />,
      },
      {
        path: '/barcodes-sortie/:id',
        element: <BarcodesSortie />,
      },

      {
        path: '*',
        element: (
          <h1
            style={{
              textAlign: 'center',
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          >
            Page Not Found
          </h1>
        ),
      },
    ],
  },
  {
    element: <PublicLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/reset-password',
        element: <ResetPassword />, 
      },
    ],
  },
]);