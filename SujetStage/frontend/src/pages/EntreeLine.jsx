import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { axiosClient } from '../api/axios';

const EntreeLine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lines, setLines] = useState([]);
  const [dataArticles, setDataArticles] = useState([]);
  const [fournisseurs, setFournisseurs] = useState([]);
  const [formData, setFormData] = useState({ art_id: '', quantite: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [entreeData, setEntreeData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(''); 

  const API_URL = '/api';

  useEffect(() => {
  
    axiosClient.get('/sanctum/csrf-cookie');

 
    const fetchData = async () => {
      try {
        const [articlesResponse, linesResponse, fournisseursResponse, entreeResponse] = await Promise.all([
          axiosClient.get(`${API_URL}/articles`),
          axiosClient.get(`${API_URL}/entree-lines/${id}`),
          axiosClient.get(`${API_URL}/fournisseurs`),
          axiosClient.get(`${API_URL}/entrees/${id}`)
        ]);

        setDataArticles(articlesResponse.data);
        setLines(linesResponse.data);
        setFournisseurs(fournisseursResponse.data);
        setEntreeData(entreeResponse.data);
      } catch (error) {
        alert('Erreur lors de la récupération des données');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

 
  const filteredLines = lines.filter((line) => {
    const article = dataArticles.find((art) => art.id === line.art_id);
    const articleDesignation = article ? article.designation.toLowerCase() : '';
    const search = searchQuery.toLowerCase();
    return (
      articleDesignation.includes(search) ||
      line.quantite.toString().includes(search) 
    );
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAfficher = () => {
    navigate(`/afficher-entree/${id}`);
  };

  const handleSave = async (index = null) => {
    if (!formData.art_id || !formData.quantite) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    const payload = {
      entree_id: id,
      art_id: formData.art_id,
      quantite: formData.quantite,
    };

    try {
      if (index === null) {
        const response = await axiosClient.post(`${API_URL}/entree-lines`, payload);
        setLines([...lines, response.data]);
      } else {
        const updatedLine = lines[index];
        const response = await axiosClient.put(`${API_URL}/entree-lines/${updatedLine.id}`, payload);
        const updatedLines = [...lines];
        updatedLines[index] = response.data;
        setLines(updatedLines);
        setEditingIndex(null);
      }
      setFormData({ art_id: '', quantite: '' });
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la sauvegarde');
    }
  };

  const handleDelete = async (lineId) => {
    try {
      await axiosClient.delete(`${API_URL}/entree-lines/${lineId}`);
      setLines(lines.filter((line) => line.id !== lineId));
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la suppression');
    }
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      {isLoading ? (
        <p>Chargement des données...</p>
      ) : (
        <>
          <h1 className="Class">Informations de l'entrée N° {entreeData.id}</h1>
          {entreeData && (
            <div className="entree-details-container">
              <div className="DEV">
                <div className="left">
                  <div className="F">
                    <strong>FRS:</strong>
                    {fournisseurs.find((frs) => frs.id === Number(entreeData.frs_id))?.raison || 'Inconnu'}
                  </div>
                  <div className="F">
                    <strong>Type:</strong> {entreeData.type}
                  </div>
                  <div className="F">
                    <strong>Numéro:</strong> {entreeData.numero}
                  </div>
                </div>

                <div className="center">
                  <div className="Date">
                    <strong>Date:</strong> {entreeData.date}
                  </div>
                </div>

                <div className="right">
                  <div className="O">
                    <strong>NumFactBL:</strong> {entreeData.numFactBl}
                  </div>
                  <div className="O">
                    <strong>Observation:</strong> {entreeData.observation}
                  </div>
                </div>
              </div>
            </div>
          )}

          <button  className="afficher-btn" onClick={handleAfficher}>
            <i className="ri-eye-line"></i> Afficher
          </button>

         
          <div style={{ margin: '20px' }}>
            <label  style={{marginLeft:'60px'}}>rechercher :</label>
            <input
              type="text"
              placeholder="Rechercher par désignation ou quantité..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ margin: '10px 0', padding: '5px', width: '300px' }}

            />
          </div>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Désignation</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Quantité</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
              </tr>
              <tr>
                <td></td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <select
                    name="art_id"
                    value={formData.art_id}
                    onChange={handleInputChange}
                    style={{ padding: '8px', width: '100%' }}
                  >
                    <option value="">-- Choisissez un article --</option>
                    {dataArticles.map((art) => (
                      <option key={art.id} value={art.id}>
                        {art.designation}
                      </option>
                    ))}
                  </select>
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <input
                    type="number"
                    name="quantite"
                    value={formData.quantite}
                    onChange={handleInputChange}
                    placeholder="Quantité"
                    style={{ padding: '8px', width: '100%' }}
                  />
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button className="add-btn" onClick={() => handleSave()}>
                    Ajouter
                  </button>
                </td>
              </tr>
            </thead>
            <tbody>
              {filteredLines.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ padding: '10px', textAlign: 'center' }}>
                    Aucune ligne ajoutée
                  </td>
                </tr>
              ) : (
                filteredLines.map((line, index) => (
                  <tr key={line.id}>
                    <td>{line.id}</td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {editingIndex === index ? (
                        <select
                          name="art_id"
                          value={formData.art_id}
                          onChange={handleInputChange}
                          style={{ padding: '8px', width: '100%' }}
                        >
                          <option value="">-- Choisissez un article --</option>
                          {dataArticles.map((art) => (
                            <option key={art.id} value={art.id}>
                              {art.designation}
                            </option>
                          ))}
                        </select>
                      ) : (
                        dataArticles.find((a) => a.id === line.art_id)?.designation || 'Inconnu'
                      )}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {editingIndex === index ? (
                        <input
                          type="number"
                          name="quantite"
                          value={formData.quantite}
                          onChange={handleInputChange}
                          style={{ padding: '8px', width: '100%' }}
                        />
                      ) : (
                        line.quantite
                      )}
                    </td>
                    <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                      {editingIndex === index ? (
                        <button className="save-btn" onClick={() => handleSave(index)}>
                          Sauvegarder
                        </button>
                      ) : (
                        <>
                          <button
                            className="edit-btn"
                            onClick={() => {
                              setEditingIndex(index);
                              setFormData({ art_id: line.art_id, quantite: line.quantite });
                            }}
                          >
                            <i className="ri-edit-box-line"></i> Modifier
                          </button>
                        </>
                      )}
                      <button className="delete-btn" onClick={() => handleDelete(line.id)}>
                        <i className="ri-delete-bin-6-line"></i> Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default EntreeLine;
