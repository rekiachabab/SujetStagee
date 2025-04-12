import React, { useState } from 'react';
import '../index.css';

const Articles = () => {
  const [type, setType] = useState('Consommable');
  const [category, setCategory] = useState('');
  const [designation, setDesignation] = useState('');
  const [qtyStock, setQtyStock] = useState('');
  const [qtyAlert, setQtyAlert] = useState('');
  const [unite, setUnite] = useState('');
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({
    id: '',
    type: 'Consommable',
    category: '',
    designation: '',
    qtyStock: '',
    qtyAlert: '',
    unite: ''
  });

  const [nextId, setNextId] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState(null);

  const handleAddData = () => {
    if (category.trim() === '' || designation.trim() === '' || qtyStock.trim() === '' || qtyAlert.trim() === '' || unite.trim() === '') {
      alert('Veuillez remplir tous les champs!');
      return;
    }

    const newId = nextId;
    setNextId(nextId + 1);

    setData([
      ...data,
      { id: newId, type, category, designation, qtyStock, qtyAlert, unite }
    ]);

    setCategory('');
    setDesignation('');
    setQtyStock('');
    setQtyAlert('');
    setUnite('');
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(data[index]);
  };

  const handleSave = (index) => {
    if (editingData.category.trim() === '' || editingData.designation.trim() === '' || editingData.qtyStock.trim() === '' || editingData.qtyAlert.trim() === '' || editingData.unite.trim() === '') {
      alert('Veuillez remplir tous les champs!');
      return;
    }

    const newData = [...data];
    newData[index] = editingData;
    setData(newData);
    setEditingIndex(null);
    setEditingData({
      id: '',
      type: 'Consommable',
      category: '',
      designation: '',
      qtyStock: '',
      qtyAlert: '',
      unite: ''
    });
  };

  const handleDetails = (index) => {
    setSelectedArticle(data[index]); 
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Table des articles</h2>

      
      {selectedArticle && (
        <div className="article-details" style={{ marginBottom: '20px', textAlign: 'left', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
          <h3>Détails de l'article {selectedArticle.id}</h3>
          <p><strong>ID :</strong> {selectedArticle.id}</p>
          <p><strong>Type :</strong> {selectedArticle.type}</p>
          <p><strong>Catégorie :</strong> {selectedArticle.category}</p>
          <p><strong>Désignation :</strong> {selectedArticle.designation}</p>
          <p><strong>Quantité en stock :</strong> {selectedArticle.qtyStock}</p>
          <p><strong>Quantité d'alerte :</strong> {selectedArticle.qtyAlert}</p>
          <p><strong>Unité :</strong> {selectedArticle.unite}</p>
        </div>
      )}

      
      <table style={{ width: '100%', margin: 'auto', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Catégorie</th>
            <th>Désignation</th>
            <th>Quantité en stock</th>
            <th>Quantité d'alerte</th>
            <th>Unité</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td>{nextId}</td>
            <td>
              <select value={type} onChange={(e) => setType(e.target.value)} style={{ width: '80%', padding: '5px' }}>
                <option value="Consommable">Consommable</option>
                <option value="Non Consommable">Non Consommable</option>
              </select>
            </td>
            <td>
              <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '80%', padding: '5px' }}>
                <option value="">Sélectionner la catégorie</option>
                <option value="Category1">Catégorie 1</option>
                <option value="Category2">Catégorie 2</option>
                <option value="Category3">Catégorie 3</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Entrer la désignation"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <input
                type="number"
                value={qtyStock}
                onChange={(e) => setQtyStock(e.target.value)}
                placeholder="Quantité en stock"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <input
                type="number"
                value={qtyAlert}
                onChange={(e) => setQtyAlert(e.target.value)}
                placeholder="Quantité d'alerte"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <input
                type="text"
                value={unite}
                onChange={(e) => setUnite(e.target.value)}
                placeholder="Unité"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <button className="add-btn" onClick={handleAddData}>
                <i className="ri-add-line"></i> Ajouter
              </button>
            </td>
          </tr>

        
          {data.length === 0 ? (
            <tr>
              <td colSpan="8">Aucune donnée disponible</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>
                  {editingIndex === index ? (
                    <select
                      value={editingData.type}
                      onChange={(e) => setEditingData({ ...editingData, type: e.target.value })}
                    >
                      <option value="Consommable">Consommable</option>
                      <option value="Non Consommable">Non Consommable</option>
                    </select>
                  ) : (
                    item.type
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingData.category}
                      onChange={(e) => setEditingData({ ...editingData, category: e.target.value })}
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingData.designation}
                      onChange={(e) => setEditingData({ ...editingData, designation: e.target.value })}
                    />
                  ) : (
                    item.designation
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editingData.qtyStock}
                      onChange={(e) => setEditingData({ ...editingData, qtyStock: e.target.value })}
                    />
                  ) : (
                    item.qtyStock
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editingData.qtyAlert}
                      onChange={(e) => setEditingData({ ...editingData, qtyAlert: e.target.value })}
                    />
                  ) : (
                    item.qtyAlert
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingData.unite}
                      onChange={(e) => setEditingData({ ...editingData, unite: e.target.value })}
                    />
                  ) : (
                    item.unite
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button className="save-btn" onClick={() => handleSave(index)}>
                      Enregistrer
                    </button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(index)}>
                      <i className="ri-edit-box-line"></i> Modifier
                    </button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(index)}>
                    <i className="ri-delete-bin-6-line"></i> Supprimer
                  </button>
                  <button className="details-btn" onClick={() => handleDetails(index)}>
                    <i className="ri-eye-line"></i> Détails
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

export default Articles;
