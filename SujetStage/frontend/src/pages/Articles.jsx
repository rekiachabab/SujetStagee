import React, { useState, useEffect } from 'react';
import { axiosClient } from '../api/axios';

const Articles = () => {
  const [type, setType] = useState('Consommable');
  const [categoryId, setCategoryId] = useState('');
  const [designation, setDesignation] = useState('');
  const [qtyStock, setQtyStock] = useState('');
  const [qtyAlert, setQtyAlert] = useState('');
  const [unite, setUnite] = useState('');
  const [data, setData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({
    id: '',
    type: 'Consommable',
    category_id: '',
    designation: '',
    qty_stock: '',
    qty_alert: '',
    unite: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie').then(fetchArticles);
    fetchCategories();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    fetchArticles();
  }, [debouncedSearchTerm]);

  const fetchCategories = async () => {
    try {
      const response = await axiosClient.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des catégories', error);
    }
  };

  const fetchArticles = async () => {
    try {
      const response = await axiosClient.get('/api/articles');
      setData(response.data);
    } catch (error) {
      console.error('Erreur lors du chargement des articles', error);
    }
  };

  const filteredData = data.filter(item =>
    Object.values(item).some(value =>
      value && value.toString().toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    ) ||
    (item.category && item.category.category.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
  );

  const handleAddArticle = async () => {
    if (designation.trim() === '' || categoryId === '') {
      alert('Veuillez remplir tous les champs!');
      return;
    }
    try {
      const response = await axiosClient.post('/api/articles', {
        type,
        category_id: categoryId,
        designation,
        qty_stock: qtyStock,
        qty_alert: qtyAlert,
        unite,
      });
      setData([...data, response.data]);
      setDesignation('');
      setCategoryId('');
      setQtyStock('');
      setQtyAlert('');
      setUnite('');
    } catch (error) {
      console.error('Erreur lors de l\'ajout', error);
    }
  };

  const handleEditArticle = (index) => {
    setEditingIndex(index);
    const item = filteredData[index];
    setEditingData({
      id: item.id,
      type: item.type,
      category_id: item.category?.id || '', // ✅ corrigé ici
      designation: item.designation,
      qty_stock: item.qty_stock,
      qty_alert: item.qty_alert,
      unite: item.unite,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const response = await axiosClient.put(`/api/articles/${editingData.id}`, editingData);
      const updated = [...data];
      const index = updated.findIndex(item => item.id === editingData.id);
      if (index !== -1) updated[index] = response.data;
      setData(updated);
      setEditingIndex(null);
      setEditingData({});
    } catch (error) {
      console.error("Erreur lors de l'enregistrement", error);
    }
  };

  const handleDeleteArticle = async (id) => {
    if (window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
      try {
        await axiosClient.delete(`/api/articles/${id}`);
        setData(data.filter(item => item.id !== id));
      } catch (error) {
        console.error('Erreur lors de la suppression', error);
      }
    }
  };

  return (
    <div className="App">
      <h2>Tableau des Articles</h2>

      <div>
        <label style={{ marginLeft: '40px' }}>Rechercher :</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="  Rechercher un article"
          style={{ margin: '10px 0', padding: '5px', width: '300px' }}
        />
      </div>

      <table className='TF'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Catégorie</th>
            <th>Désignation</th>
            <th>QtyStock</th>
            <th>QtyAlert</th>
            <th>Unité</th>
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
              <select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
                <option value="">Sélectionner une catégorie</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.category}</option>
                ))}
              </select>
            </td>
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
                type="number"
                value={qtyStock}
                onChange={(e) => setQtyStock(e.target.value)}
                placeholder="QtyStock"
              />
            </td>
            <td>
              <input
                type="number"
                value={qtyAlert}
                onChange={(e) => setQtyAlert(e.target.value)}
                placeholder="QtyAlert"
              />
            </td>
            <td>
              <input
                type="text"
                value={unite}
                onChange={(e) => setUnite(e.target.value)}
                placeholder="Unité"
              />
            </td>
            <td>
              <button className='add-btn' onClick={handleAddArticle}><i className="ri-add-line"></i>Ajouter</button>
            </td>
          </tr>

          {filteredData.length === 0 ? (
            <tr>
              <td colSpan="8">Aucune donnée</td>
            </tr>
          ) : (
            filteredData.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>
                  {editingIndex === index ? (
                    <select value={editingData.type} onChange={(e) => setEditingData({ ...editingData, type: e.target.value })}>
                      <option value="Consommable">Consommable</option>
                      <option value="Non Consommable">Non Consommable</option>
                    </select>
                  ) : (
                    item.type
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <select value={editingData.category_id} onChange={(e) => setEditingData({ ...editingData, category_id: e.target.value })}>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.category}</option>
                      ))}
                    </select>
                  ) : (
                    item.category?.category
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
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
                      value={editingData.qty_stock}
                      onChange={(e) => setEditingData({ ...editingData, qty_stock: e.target.value })}
                    />
                  ) : (
                    item.qty_stock
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="number"
                      value={editingData.qty_alert}
                      onChange={(e) => setEditingData({ ...editingData, qty_alert: e.target.value })}
                    />
                  ) : (
                    item.qty_alert
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      value={editingData.unite}
                      onChange={(e) => setEditingData({ ...editingData, unite: e.target.value })}
                    />
                  ) : (
                    item.unite
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <>
                      <button className="save-btn" onClick={handleSaveEdit}><i className="ri-check-line"></i> Sauvegarder</button>
                      <button className="cancel-btn" onClick={() => setEditingIndex(null)}><i className="ri-close-line"></i> Annuler</button>
                    </>
                  ) : (
                    <>
                      <button className="edit-btn" onClick={() => handleEditArticle(index)}><i className="ri-edit-box-line"></i> Modifier</button>
                      <button className="delete-btn" onClick={() => handleDeleteArticle(item.id)}><i className="ri-delete-bin-6-line"></i> Supprimer</button>
                    </>
                  )}
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
