import React, { useState, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import { axiosClient } from '../api/axios';

const Departement = () => {
  const [designation, setDesignation] = useState('');
  const [raccourci, setRaccourci] = useState('');
  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({ id: '', designation: '', raccourci: '' });
  const [searchTerm, setSearchTerm] = useState(''); 

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie');
    axiosClient.get('/api/departements')
      .then(response => {
        setData(response.data);
        console.log(response.data);
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
    axiosClient.get('/sanctum/csrf-cookie');

    axiosClient.post('/api/departements', newDepartement)
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
    axiosClient.get('/sanctum/csrf-cookie');

    axiosClient.delete(`/api/departements/${id}`)
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
    axiosClient.get('/sanctum/csrf-cookie');

    axiosClient.put(`/api/departements/${editingData.id}`, editingData)
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

  const filteredData = data
    .filter(item =>
      item.designation.toLowerCase().includes(searchTerm.toLowerCase()) || 
      item.raccourci.toLowerCase().includes(searchTerm.toLowerCase()) 
    );

  return (
    <div className="App">
      <h2>Tableau des Départements</h2>

     
      <div style={{ marginBottom: '1rem' }}>
        <label style={{marginLeft:'40px'}}>Rechercher :</label>
      

<input
            type="text"
            placeholder=" Rechercher par Désignation ou Raccourci..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ margin: '10px 0', padding: '5px', width: '300px' }}
          />
      </div>

      
      <table className='TF'>
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
                placeholder="Entrer la désignation"
              />
            </td>
            <td>
              <input
                type="text"
                value={raccourci}
                onChange={(e) => setRaccourci(e.target.value)}
                placeholder="Entrer le raccourci"
              />
            </td>
            <td>
              <button className="add-btn" onClick={handleAddData}>
                <i className="ri-add-line"></i> Ajouter
              </button>
            </td>
          </tr>

          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="4">Aucune donnée disponible</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
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
