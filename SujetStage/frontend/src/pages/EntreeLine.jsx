
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'remixicon/fonts/remixicon.css';
import '../index.css';

const EntreeLine = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [entreeData, setEntreeData] = useState(null);


  const [article, setArticle] = useState('');
  const [quantite, setQuantite] = useState('');
  const [lines, setLines] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({ idEntree: id, article: '', quantite: '' });

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('data'));
    if (storedData) {
      const foundData = storedData.find(item => item.id === parseInt(id));
      if (foundData) {
        setEntreeData(foundData);
        setLines(foundData.lines || []);
      }
    }
  }, [id]);


  useEffect(() => {
    if (entreeData) {
      const storedData = JSON.parse(localStorage.getItem('data')) || [];
      const index = storedData.findIndex(item => item.id === parseInt(id));
      if (index !== -1) {
        storedData[index].lines = lines;
        localStorage.setItem('data', JSON.stringify(storedData));
      }
    }
  }, [lines]);

  const handleAdd = () => {
    if (!article || !quantite) {
      alert('Veuillez remplir tous les champs');
      return;
    }

    setLines([...lines, { idEntree: id, article, quantite }]);
    setArticle('');
    setQuantite('');
  };

  const handleDelete = (index) => {
    const newLines = lines.filter((_, i) => i !== index);
    setLines(newLines);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(lines[index]);
  };

  const handleSave = () => {
    if (!editingData.article || !editingData.quantite) {
      alert('Champs vides');
      return;
    }

    const updated = [...lines];
    updated[editingIndex] = editingData;
    setLines(updated);
    setEditingIndex(null);
    setEditingData({ idEntree: id, article: '', quantite: '' });
  };

  const handleAfficher = () => {
    navigate(`/afficher-entree/${id}`);
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      {entreeData ? (
        <div className="entree-details-container">
          <h2>Informations de l'entrée N° {entreeData.id}</h2>
          <div className="entree-details" style={{
            background: '#eef2f5',
            padding: '20px',
            borderRadius: '10px',
            marginBottom: '20px',
            border: '1px solid #ccc'
          }}>
            <div><strong>FRS:</strong> {entreeData.frs}</div>
            <div><strong>Type:</strong> {entreeData.type}</div>
            <div><strong>Numéro:</strong> {entreeData.numero}</div>
            <div><strong>NumFactBL:</strong> {entreeData.numFactBL}</div>
            <div><strong>Observation:</strong> {entreeData.observation}</div>
            <div><strong>Date:</strong> {entreeData.date}</div>
          </div>
        </div>
      ) : (
        <p>Chargement des données...</p>
      )}

      <h2>Articles de l'entrée N° {id}</h2>
      <table>
        <thead>
          <tr>
            <th>ID Entrée</th>
            <th>Article</th>
            <th>Quantité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{id}</td>
            <td>
              <input
                type="text"
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                placeholder="Nom de l'article"
              />
            </td>
            <td>
              <input
                type="number"
                value={quantite}
                onChange={(e) => setQuantite(e.target.value)}
                placeholder="Quantité"
              />
            </td>
            <td>
              <button className='add-btn' onClick={handleAdd}>
                <i className="ri-add-line"></i> Ajouter
              </button>
            </td>
          </tr>

          {lines.length === 0 ? (
            <tr>
              <td colSpan="4">Aucune ligne ajoutée</td>
            </tr>
          ) : (
            lines.map((line, index) => (
              <tr key={index}>
                <td>{line.idEntree}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingData.article}
                      onChange={(e) => setEditingData({ ...editingData, article: e.target.value })}
                    />
                  ) : (
                    line.article
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editingData.quantite}
                      onChange={(e) => setEditingData({ ...editingData, quantite: e.target.value })}
                    />
                  ) : (
                    line.quantite
                  )}
                </td>
                <td style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
                  {editingIndex === index ? (
                    <button  className="save-btn" onClick={handleSave}>
                      <i className="ri-check-line"></i>
                    Sauvegarder</button>
                  ) : (
                    <>
                      <button className='edit-btn' onClick={() => handleEdit(index)}>
                        <i className="ri-edit-box-line"></i>
                      Modifier</button>
                      <button className='delete-btn' onClick={() => handleDelete(index)}>
                        <i className="ri-delete-bin-6-line"></i>
                      Delete</button>
                    </>
                  )}
                  <button  onClick={handleAfficher} style={{ color: 'white', backgroundColor: '#3B82F6' }}>
                    <i className="ri-eye-line"></i> Afficher
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

export default EntreeLine;