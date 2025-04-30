import React from 'react'; 
import '../styles/Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="text-content">
        <h1>Bienvenue dans notre Gestion de Stock</h1>
        <p>
        La gestion des stocks permet de contrôler les produits de l'entreprise, de leur réception à leur utilisation. Cela inclut la gestion des fournisseurs, des entrées et des sorties, ainsi que le suivi des départements et des fonctionnaires responsables. Une bonne gestion optimise les ressources et garantit la disponibilité des produits sans excédent.
        </p>
      </div>
      <div className="image-content">
      <img src="../public/stock.jpg" alt="" />
      </div>
    </div>
  );
};

export default Home;