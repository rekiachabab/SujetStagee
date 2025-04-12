import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import 'remixicon/fonts/remixicon.css';

const Departement = () => {
  const [designation, setDesignation] = useState('');
  const [raccourci, setRaccourci] = useState('');
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({ id: '', designation: '', raccourci: '' });

  
  useEffect(() => {
  
    axios.get('http://localhost:8000/api/departements')
      .then(response => {
        setData(response.data)
        console.log(response.data)
      })
      .catch(error => {
        console.error('Erreur lors du chargement des départements :', error);
      });
  }, []);
 
  const handleAddData = () => {
    if (designation.trim() === '' || raccourci.trim() === '') {
      alert('Veuillez entrer une désignation et un raccourci.');
      return;
    }

    const newDepartement = { designation, raccourci };
 axios.get('http://localhost:8000/sanctum/csrf-cookie')
    axios.post('http://localhost:8000/api/departements', newDepartement)
      .then(response => {
        setData([...data, response.data]);
        setDesignation('');
        setRaccourci('');
      })
      .catch(error => {
        console.error('Erreur lors de l\'ajout du département :', error);
      });
  };

  
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/departements/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(error => {
        console.error('Erreur lors de la suppression :', error);
      });
  };

  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData({ ...data[index] });
  };

  
  const handleSave = (index) => {
    axios.put(`http://localhost:8000/api/departements/${editingData.id}`, editingData)
      .then(response => {
        const updatedData = [...data];
        updatedData[index] = response.data;
        setData(updatedData);
        setEditingIndex(null);
        setEditingData({ id: '', designation: '', raccourci: '' });
      })
      .catch(error => {
        console.error('Erreur lors de la mise à jour :', error);
      });
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Tableau des Départements</h2>

      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Désignation</th>
            <th>Raccourci</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Formulaire d'ajout */}
          <tr>
            <td></td>
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
                type="text"
                value={raccourci}
                onChange={(e) => setRaccourci(e.target.value)}
                placeholder="Entrer le raccourci"
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
              <td colSpan="4">Aucune donnée disponible</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
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
                      type="text"
                      value={editingData.raccourci}
                      onChange={(e) => setEditingData({ ...editingData, raccourci: e.target.value })}
                    />
                  ) : (
                    item.raccourci
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

export default Departement;


























/* import React, { useState } from 'react';
import '../index.css';
import 'remixicon/fonts/remixicon.css';

const Departement = () => {
  const [designation, setDesignation] = useState('');
  const [raccourci, setRaccourci] = useState('');
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({ id: '', designation: '', raccourci: '' });
  const [nextId, setNextId] = useState(1); 

  const handleAddData = () => {
    if (designation.trim() === '' || raccourci.trim() === '') {
      alert('Veuillez entrer des valeurs pour la Désignation et le Raccourci !');
      return;
    }

    setData([...data, { id: nextId, designation, raccourci }]);
    setNextId(nextId + 1);  
    setDesignation('');
    setRaccourci('');
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
    if (editingData.designation.trim() === '' || editingData.raccourci.trim() === '') {
      alert('Veuillez entrer des valeurs pour la Désignation et le Raccourci pour mettre à jour !');
      return;
    }
    const newData = [...data];
    newData[index] = editingData; 
    setData(newData);
    setEditingIndex(null);  
    setEditingData({ id: '', designation: '', raccourci: '' });  
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Tableau des Départements</h2>

      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Désignation</th>
            <th>Raccourci</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td></td>
            <td>
              <input
                type="text"
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                placeholder="Entrer la Désignation"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <input
                type="text"
                value={raccourci}
                onChange={(e) => setRaccourci(e.target.value)}
                placeholder="Entrer le Raccourci"
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
              <td colSpan="4">Aucune donnée disponible</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
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
                      type="text"
                      value={editingData.raccourci}
                      onChange={(e) => setEditingData({ ...editingData, raccourci: e.target.value })}
                    />
                  ) : (
                    item.raccourci
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
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Departement;
 */