import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import { axiosClient } from '../api/axios';

const Categories = () => {
  const [type, setType] = useState('Consommable');
  const [category, setCategory] = useState('');
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');  
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({ id: '', type: 'Consommable', category: '' });

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie').then(fetchCategories);
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get('/api/categories');
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories', error);
    }
  };

  
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleAddData = async () => {
    if (category.trim() === '') {
      alert('Veuillez entrer une catégorie !');
      return;
    }

    try {
      const response = await axiosClient.post(
        '/api/categories',
        { type, category },
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
      );
      setData([...data, response.data]);
      setType('Consommable');
      setCategory('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout', error);
    }
  };

  const handleDelete = async (index) => {
    const item = data[index];
    console.log('Trying to delete category with ID:', item?.id);
    try {
      await axiosClient.delete(`/api/categories/${item.id}`);
      setData(data.filter((_, i) => i !== index));
    } catch (error) {
      console.error('Erreur lors de la suppression', error);
    }
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(data[index]);
  };

  const handleSave = async (index) => {
    if (editingData.category.trim() === '') {
      alert('Catégorie invalide !');
      return;
    }

    try {
      const response = await axiosClient.put(
        `/api/categories/${editingData.id}`,
        editingData,
        { headers: { 'Content-Type': 'application/json', Accept: 'application/json' } }
      );
      const newData = [...data];
      newData[index] = response.data;
      setData(newData);
      setEditingIndex(null);
      setEditingData({ id: '', type: 'Consommable', category: '' });
    } catch (error) {
      console.error('Erreur lors de la mise à jour', error);
    }
  };

  return (
    <div className="App">
      <h2>Tableau des Catégories</h2>

      <div>
        <label  style={{marginLeft:'40px'}}>Rechercher :</label>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder=" Rechercher par catégorie"
          style={{ margin: '10px 0', padding: '5px', width: '300px' }}
        />
      </div>

      <table className='TF'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Catégorie</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Consommable">Consommable</option>
                <option value="Non Consommable">Non Consommable</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Entrer une catégorie"
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
              <td colSpan="4">Aucune donnée</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={item.id ?? `row-${index}`}>
                <td>{item.id}</td>
                <td>
                  {editingIndex === index ? (
                    <select
                      value={editingData.type}
                      onChange={(e) =>
                        setEditingData({ ...editingData, type: e.target.value })
                      }
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
                      value={editingData.category}
                      onChange={(e) =>
                        setEditingData({ ...editingData, category: e.target.value })
                      }
                    />
                  ) : (
                    item.category
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button className="save-btn" onClick={() => handleSave(index)}>Enregistrer</button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(index)}>
                      <i className="ri-edit-box-line"></i> Modifier
                    </button>
                  )}
                  <button className='delete-btn' onClick={() => handleDelete(index)}>
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

export default Categories;
