import axios from 'axios';
import React, { useState, useEffect } from 'react';
import '../styles/table.css';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../api/axios';

const Entree = () => {
  const [formData, setFormData] = useState({
    id: '',
    frs: '',
    type: '',
    numero: '',
    numFactBL: '',
    observation: '',
    date: '',
  });

  const [dataFrs, setDataFrs] = useState([]);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);
  const API_URL = '/api';
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie');
    
    const fetchFournisseurs = async () => {
      try {
        const response = await axiosClient.get(`${API_URL}/fournisseurs`);
        setDataFrs(response.data);
      } catch (error) {
        setError("Erreur lors de la récupération des fournisseurs");
        console.error(error);
      }
    };

    const fetchEntrees = async () => {
      try {
        const response = await axiosClient.get(`${API_URL}/entrees`);
        setData(response.data);
        setFilteredData(response.data); 
      } catch (error) {
        setError("Erreur lors de la récupération des entrées");
        console.error(error);
      }
    };

    fetchFournisseurs();
    fetchEntrees();
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredData(data); 
    } else {
      const filtered = data.filter(item =>
        Object.values(item).some(value =>
          value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        ) || 
        (item.frs_id && dataFrs.find(frs => frs.id === item.frs_id)?.raison.toLowerCase().includes(searchTerm.toLowerCase())) ||
        item.numFactBl.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data, dataFrs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddData = async () => {
    if (!formData.frs || !formData.type || !formData.numero || !formData.numFactBL || !formData.date) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    try {
      const newData = {
        frs_id: formData.frs,
        type: formData.type,
        numero: formData.numero,
        numFactBL: formData.numFactBL,
        observation: formData.observation,
        date: formData.date,
      };

      const response = await axiosClient.post(`${API_URL}/entrees`, newData);
      setData([...data, response.data]);
      alert('Donnée ajoutée avec succès');
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Erreur inconnue lors de l'ajout !";
      alert("Erreur: " + msg);
    }

    setFormData({
      frs: '',
      type: '',
      numero: '',
      numFactBL: '',
      observation: '',
      date: '',
    });
  };

  const handleDelete = async (id) => {
    try {
      const response = await axiosClient.delete(`${API_URL}/entrees/${id}`);
      if (response.status === 200) {
        setData(data.filter(item => item.id !== id));
        setFilteredData(filteredData.filter(item => item.id !== id)); 
        alert("Donnée supprimée avec succès");
      } else {
        alert("Erreur lors de la suppression");
      }
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Erreur inconnue";
      alert("Erreur: " + msg);
    }
  };

  const handleModify = (id) => {
    navigate(`/entreeline/${id}`);
    localStorage.setItem('data', JSON.stringify(data));
  };

  return (
    <div className="App">
      <div className='Nv'>
        <h1 className="Class">Nouvelle Entrée :</h1>
        <hr />
      </div>

     
      <div>
        
        <label  style={{marginLeft:'60px'}}>Rechercher :</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder=" Rechercher..."
          style={{ margin: '10px 0', padding: '5px', width: '300px' }}
        />
      </div>

      <table className='TE'>
        <thead>
          <tr>
            <th>ID</th>
            <th>FRS</th>
            <th>Type</th>
            <th>Facture/BL</th>
            <th>Numéro</th>
            <th>Observation</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
          <tr>
            <td></td>
            <td>
              <select name="frs" value={formData.frs} onChange={handleInputChange}>
                <option value="">Choisissez FRS</option>
                {dataFrs.map(item => (
                  <option key={item.id} value={item.id}>{item.raison}</option>
                ))}
              </select>
            </td>
            <td>
              <select name="type" value={formData.type} onChange={handleInputChange}>
                <option value="">Choisissez</option>
                <option value="Bon Commande">Bon Commande</option>
                <option value="Bon Marché">Bon Marché</option>
              </select>
            </td>
            <td>
              <select name="numero" value={formData.numero} onChange={handleInputChange}>
                <option value="">Choisissez</option>
                <option value="1">Facture</option>
                <option value="2">Bon Livraison</option>
              </select>
            </td>
            <td>
              <input type="text" name="numFactBL" value={formData.numFactBL} onChange={handleInputChange} placeholder="NumFactBL" />
            </td>
            <td>
              <input type="text" name="observation" value={formData.observation} onChange={handleInputChange} placeholder="Observation" />
            </td>
            <td>
              <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
            </td>
            <td>
              <button className="add-btn" onClick={handleAddData}>
                <i className="ri-add-line"></i> Ajouter
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          {filteredData.length === 0 ? (
            <tr><td colSpan="8">Aucune donnée disponible</td></tr>
          ) : (
            filteredData.map(item => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{dataFrs.find(frs => frs.id === item.frs_id)?.raison || "N/A"}</td>
                <td>{item.type === 'Bon Commande' ? 'Bon Commande' : 'Bon Marché'}</td>
                <td>{item.numero === '1' ? 'Facture' : 'Bon Livraison'}</td>
                <td>{item.numFactBl}</td>
                <td>{item.observation}</td>
                <td>{new Date(item.date).toLocaleDateString('fr-FR')}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleModify(item.id)}>
                    <i className="ri-edit-box-line"></i> Modifier
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    <i className="ri-delete-bin-6-line"></i> Supprimer
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Entree;
