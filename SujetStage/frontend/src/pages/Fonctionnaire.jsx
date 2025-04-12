import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';
import 'remixicon/fonts/remixicon.css';

const Fonctionnaire = () => {

  const [departement, setDepartement] = useState('');  
  const [adresse, setAdresse] = useState('');          
  const [tel, setTel] = useState('');                  
  const [ville, setVille] = useState('');              
  const [observation, setObservation] = useState('');  
  const [email, setEmail] = useState('');              
  const [responsable, setResponsable] = useState('');  
  const [fax, setFax] = useState('');                  
  const [data, setData] = useState([]);                
  const [editingIndex, setEditingIndex] = useState(null);  
  const [editingData, setEditingData] = useState({    
    id: '',
    departement_id: '',
    adresse: '',
    tel: '',
    ville: '',
    observation: '',
    email: '',
    responsable: '',
    fax: '',
  });

  const [departments, setDepartments] = useState([]);  

  
  useEffect(() => {
    axios.get('http://localhost:8000/api/departements')
      .then(response => {
        setDepartments(response.data);  
      })
      .catch(error => {
        console.error('Error fetching departements:', error);
      });
  }, []);

 
  useEffect(() => {
    axios.get('http://localhost:8000/api/fonctionnaires')
      .then(response => {
        setData(response.data);  
      })
      .catch(error => {
        console.error('Error fetching fonctionnaires:', error);
      });
  }, [data]);

  
  const handleAddData = () => {
    if (
      departement.trim() === '' ||
      adresse.trim() === '' ||
      tel.trim() === '' ||
      ville.trim() === '' ||
      observation.trim() === '' ||
      email.trim() === '' ||
      responsable.trim() === '' ||
      fax.trim() === ''
    ) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    const newData = {
      departement_id: departement,
      adresse,
      tel,
      ville,
      observation,
      email,
      responsable,
      fax
    };

    axios.post('http://localhost:8000/api/fonctionnaires', newData)
      .then(response => {
        setData(prevData => [...prevData, response.data]);  
        setDepartement('');
        setAdresse('');
        setTel('');
        setVille('');
        setObservation('');
        setEmail('');
        setResponsable('');
        setFax('');
      })
      .catch(error => {
        console.error('Error adding data:', error.response ? error.response.data : error);
        alert('Erreur lors de l\'ajout des données');
      });
      axios.get('http://localhost:8000/api/fonctionnaires')

  };

 
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8000/api/fonctionnaires/${id}`)
      .then(() => {
        setData(data.filter(item => item.id !== id));  
      })
      .catch(error => {
        console.error('Error deleting data:', error);
      });
  };

  
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditingData(data[index]);
  };


  const handleSave = (id) => {
    const updatedData = { ...editingData };

    if (Object.keys(updatedData).length === 0) {
      alert('Aucune modification détectée.');
      return;
    }

    axios.put(`http://localhost:8000/api/fonctionnaires/${id}`, updatedData)
      .then(response => {
        const updatedItems = [...data];
        const index = updatedItems.findIndex(item => item.id === id);
        updatedItems[index] = response.data;
        setData(updatedItems);
        setEditingIndex(null);  
      })
      .catch(error => {
        console.error('Error saving data:', error);
        alert('Erreur lors de la mise à jour des données');
      });
      axios.get('http://localhost:8000/api/fonctionnaires')
      .then(response=>{
        setData(response.data)
      })
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Table Fonctionnaire</h2>

      <table style={{ borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Département</th>
            <th>Adresse</th>
            <th>Téléphone</th>
            <th>Ville</th>
            <th>Observation</th>
            <th>Email</th>
            <th>Responsable</th>
            <th>Fax</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <select
                value={departement}
                onChange={(e) => setDepartement(e.target.value)}
                style={{ width: '80%', padding: '5px' }}
              >
                <option value="">Sélectionner le Département</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.raccourci}
                  </option>
                ))}
              </select>
            </td>
            <td><input type="text" value={adresse} onChange={(e) => setAdresse(e.target.value)} placeholder="Entrez l'Adresse" /></td>
            <td><input type="number" value={tel} onChange={(e) => setTel(e.target.value)} placeholder="Entrez le Téléphone" /></td>
            <td><input type="text" value={ville} onChange={(e) => setVille(e.target.value)} placeholder="Entrez la Ville" /></td>
            <td><input type="text" value={observation} onChange={(e) => setObservation(e.target.value)} placeholder="Entrez l'Observation" /></td>
            <td><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Entrez l'Email" /></td>
            <td><input type="text" value={responsable} onChange={(e) => setResponsable(e.target.value)} placeholder="Entrez le Responsable" /></td>
            <td><input type="number" value={fax} onChange={(e) => setFax(e.target.value)} placeholder="Entrez le Fax" /></td>
            <td><button className="add-btn" onClick={handleAddData}><i className="ri-add-line"></i> Ajouter</button></td>
          </tr>

          {data.length === 0 ? (
            <tr>
              <td colSpan="10">Aucune donnée disponible</td>
            </tr>
          ) : (
            data.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{editingIndex === index ? (
                  <select
                    value={editingData.departement_id}
                    onChange={(e) => setEditingData({ ...editingData, departement_id: e.target.value })}
                  >
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.raccourci}
                      </option>
                    ))}
                  </select>
                ) : item.departement?.raccourci}
                </td>
                <td>{editingIndex === index ? (
                  <input type="text" value={editingData.adresse} onChange={(e) => setEditingData({ ...editingData, adresse: e.target.value })} />
                ) : item.adresse}</td>
                <td>{editingIndex === index ? (
                  <input type="text" value={editingData.tel} onChange={(e) => setEditingData({ ...editingData, tel: e.target.value })} />
                ) : item.tel}</td>
                <td>{editingIndex === index ? (
                  <input type="text" value={editingData.ville} onChange={(e) => setEditingData({ ...editingData, ville: e.target.value })} />
                ) : item.ville}</td>
                <td>{editingIndex === index ? (
                  <input type="text" value={editingData.observation} onChange={(e) => setEditingData({ ...editingData, observation: e.target.value })} />
                ) : item.observation}</td>
                <td>{editingIndex === index ? (
                  <input type="email" value={editingData.email} onChange={(e) => setEditingData({ ...editingData, email: e.target.value })} />
                ) : item.email}</td>
                <td>{editingIndex === index ? (
                  <input type="text" value={editingData.responsable} onChange={(e) => setEditingData({ ...editingData, responsable: e.target.value })} />
                ) : item.responsable}</td>
                <td>{editingIndex === index ? (
                  <input type="text" value={editingData.fax} onChange={(e) => setEditingData({ ...editingData, fax: e.target.value })} />
                ) : item.fax}</td>
                <td>
                  {editingIndex === index ? (
                    <button className="save-btn" onClick={() => handleSave(item.id)}>Sauvegarder</button>
                  ) : (
                    <button className="edit-btn" onClick={() => handleEdit(index)}><i className="ri-edit-box-line"></i> Modifier</button>
                  )}
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}><i className="ri-delete-bin-6-line"></i> Supprimer</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Fonctionnaire;
