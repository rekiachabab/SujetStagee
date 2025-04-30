import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import JsBarcode from 'jsbarcode';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import '../index.css';
import { axiosClient } from '../api/axios';

const SortieLine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sortieData, setSortieData] = useState(null);
  const [lines, setLines] = useState([]);
  const [newLine, setNewLine] = useState({ art: '', quantite: '' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [articleOptions, setArticleOptions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const API_URL = '/api';

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie');

    const fetchSortie = async () => {
      try {
        const response = await axiosClient.get(`${API_URL}/sorties/${id}`);
        if (response.data && response.data.length > 0) {
          setSortieData(response.data[0]);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la sortie :', error);
      }
    };

    const fetchSortieLine = async () => {
      try {
        const response = await axiosClient.get(`${API_URL}/sortie-lines/${id}`);
        if (Array.isArray(response.data)) {
          setLines(response.data);
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des lignes de sortie :', error);
      }
    };

    const fetchArticles = async () => {
      try {
        const response = await axiosClient.get(`${API_URL}/articles`);
        setArticleOptions(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des articles :', error);
      }
    };

    fetchSortie();
    fetchSortieLine();
    fetchArticles();
  }, [id]);

  const handleChange = (e) => {
    setNewLine({ ...newLine, [e.target.name]: e.target.value });
  };

  const handleAddLine = async () => {
    if (!newLine.art || !newLine.quantite) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    try {
      const res = await axiosClient.post(`${API_URL}/sortie-lines`, {
        sortie_id: id,
        raccourci: sortieData.raccourci,
        art: newLine.art,
        quantite: newLine.quantite,
      });

      setLines([...lines, res.data]);
      setNewLine({ art: '', quantite: '' });
    } catch (error) {
      console.error("Erreur lors de l'ajout de la ligne :", error);
    }
  };

  const handleDeleteLine = async (lineId) => {
    try {
      await axiosClient.delete(`${API_URL}/sortie-lines/${lineId}`);
      setLines(lines.filter(line => line.id !== lineId));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleEditLine = (index) => {
    setEditingIndex(index);
    setNewLine(lines[index]);
  };

  const handleSaveEdit = async () => {
    const updated = { ...newLine };
    try {
      const res = await axiosClient.put(`${API_URL}/sortie-lines/${newLine.id}`, updated);
      const updatedLines = [...lines];
      updatedLines[editingIndex] = res.data;
      setLines(updatedLines);
      setEditingIndex(null);
      setNewLine({ art: '', quantite: '' });
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
    }
  };

  const handleAfficher = () => {
    navigate(`/afficher-sortie/${id}`);
  };

  const getArticleDesignation = (articleId) => {
    const found = articleOptions.find((a) => a.id === articleId);
    return found ? found.designation : 'Inconnu';
  };

  const filteredLines = lines.filter(line =>
    getArticleDesignation(line.art_id).toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.num_invent.toString().toLowerCase().includes(searchTerm.toLowerCase()) ||
    line.quantite.toString().includes(searchTerm)
  );

  const renderBarcode = (num_invent, type_invt, ansinvt) => {
    return (
      <svg
        ref={(el) => {
          if (el) {
            JsBarcode(el, `${num_invent}/${type_invt}/${ansinvt}`, {
              format: 'CODE128',
              width: 1,
              height: 40,
              displayValue: true,
            });
          }
        }}
        className="barcode"
      />
    );
  };

  return (
    <div className="App" style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Sortie N° {id}</h2>
      {sortieData && (
        <div className="DEV">
          <div className="left">
            <p className="F"><strong>FCT:</strong> {sortieData.responsable}</p>
            <p className="F"><strong>Type:</strong> {sortieData.type}</p>
          </div>
          <div className="center">
            <p className="Date"><strong>DateBL:</strong> {sortieData.date_bl}</p>
          </div>
          <div className="right">
            <p className="O"><strong>Entrée:</strong> {sortieData.numero_bl}</p>
            <p className="O"><strong>NumeroBL:</strong> {sortieData.numero_bl}</p>
          </div>
        </div>
      )}
      <button className='afficher-btn' onClick={handleAfficher}>
        <i className="ri-eye-line"></i>Afficher
      </button>

      

      <div className="Rechercher">
        <label style={{marginLeft:'40px'}}>rechercher :</label>
        <input
          type="text"
          placeholder="Rechercher..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ margin: '10px 0', padding: '5px', width: '300px' }}
        />
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Article</th>
            <th>Num Inventaire</th>
            <th>Quantité</th>
            <th>Code Barre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <select name="art" value={newLine.art} onChange={handleChange}>
                <option value="">-- Choisir --</option>
                {articleOptions.map((art) => (
                  <option key={art.id} value={art.id}>{art.designation}</option>
                ))}
              </select>
            </td>
            <td>-</td>
            <td>
              <input
                type="number"
                name="quantite"
                value={newLine.quantite}
                onChange={handleChange}
              />
            </td>
            <td>{/* {renderBarcode('0000', '', '')} */}</td>
            <td>
              {editingIndex !== null ? (
                <button className='save-btn' onClick={handleSaveEdit}><i className="ri-check-line"></i> Enregistrer</button>
              ) : (
                <button className='add-btn' onClick={handleAddLine}><i className="ri-add-line"></i> Ajouter</button>
              )}
            </td>
          </tr>

          {filteredLines.length === 0 ? (
            <tr><td colSpan="6">Aucune ligne ajoutée</td></tr>
          ) : (
            filteredLines.map((line, index) => (
              <tr key={`${line.id}-${index}`}>
                <td>{line.id}</td>
                <td>{getArticleDesignation(line.art_id)}</td>
                <td>{line.num_invent}/{line.type_invt}/{line.ansinvt}</td>
                <td>{line.quantite}</td>
                <td className='c'>{renderBarcode(line.num_invent, line.type_invt, line.ansinvt)}</td>
                <td>
                  <button className='edit-btn' onClick={() => handleEditLine(index)}>
                    <i className="ri-edit-line"></i>Modifier
                  </button>
                  <button className='delete-btn' onClick={() => handleDeleteLine(line.id)}>
                    <i className="ri-delete-bin-6-line"></i>Supprimer
                  </button>
                  <button className='barcode-btn' onClick={() => navigate(`/barcodes-sortie/${id}`)}>
                    <i className="ri-barcode-box-line"></i>Inventaire
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

export default SortieLine;