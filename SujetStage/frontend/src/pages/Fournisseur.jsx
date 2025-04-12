import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css';
import '../index.css';

const API_URL = 'http://localhost:8000/api/fournisseurs';

const Fournisseur = () => {
  const [formData, setFormData] = useState({
    raison: '',
    adresse: '',
    tel: '',  
    ville: '',
    email: '',
    responsable: '',
    fax: '',  
    observation: '', 
  });

  const [data, setData] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({});

  useEffect(() => {
    axios.get(API_URL)
      .then(res => setData(res.data))
      .catch(err => console.error('Erreur de chargement:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddData = () => {
    const isEmpty = Object.values(formData).some(v => v.trim() === '');
    if (isEmpty) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    if (isNaN(formData.tel) || formData.tel.length < 10) {
      alert('Le téléphone doit contenir au moins 10 chiffres.');
      return;
    }

    axios.post(API_URL, formData)
      .then(res => {
        setData([...data, res.data.data]);
        setFormData({
          raison: '',
          adresse: '',
          tel: '',
          ville: '',
          email: '',
          responsable: '',
          fax: '', 
          observation: '', 
        });
      })
      .catch(error => {
        if (error.response && error.response.status === 422) {
          console.log("Validation errors:", error.response.data.errors);
        } else {
          console.error("Erreur d’ajout:", error);
        }
      });
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));
      })
      .catch(err => console.error('Erreur de suppression:', err));
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(data[index]);
  };

  const handleSave = (id) => {
    
console.log(editingData)
    axios.put(`${API_URL}/${id}`, editingData)
      .then(res => {
        const newData = [...data];
        newData[editingIndex] = res.data.data;
        setData(newData);
        setEditingIndex(null);
        setEditingData({});
      })
      .catch(err => console.error('Erreur de mise à jour:', err));
  };

  const handleEditChange = (e) => {
    setEditingData({ ...editingData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Gestion des Fournisseurs</h2>

      <table border="1" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Raison</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Ville</th>
            <th>Email</th>
            <th>Responsable</th>
            <th>Fax</th>
            <th>Observation</th> 
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
         
          <tr>
            <td></td>
            {Object.keys(formData).map((key) => (
              <td key={key}>
                <input
                  type={key === 'tel' ? 'number' : key === 'email' ? 'email' : key === 'fax' ? 'number' : 'text'}  // استخدام نوع 'number' للفاكس
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  style={{ width: '90%' }}
                />
              </td>
            ))}
            <td>
              <button className='add-btn' onClick={handleAddData}><i className="ri-add-line"></i> Ajouter</button>
            </td>
          </tr>

         
          {data.length === 0 ? (
            <tr><td colSpan="10">Aucune donnée</td></tr>
          ) : (
            data.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                {Object.keys(formData).map(key => (
                  <td key={key}>
                    {editingIndex === index ? (
                      <input
                        type={key === 'tel' || key === 'fax' ? 'number' : 'text'}  
                        name={key}
                        value={editingData[key]}
                        onChange={handleEditChange}
                      />
                    ) : (
                      item[key]
                    )}
                  </td>
                ))}
                <td>
                  {editingIndex === index ? (
                    <button className="save-btn" onClick={() => handleSave(item.id)}>Sauvegarder</button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(index)}><i className="ri-edit-2-line"></i>Modifier</button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}><i className="ri-delete-bin-line"></i>Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Fournisseur;
