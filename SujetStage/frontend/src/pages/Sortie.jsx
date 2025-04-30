import React, { useState, useEffect } from 'react';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom';
import { axiosClient } from '../api/axios';

const Sortie = () => {
  const [formData, setFormData] = useState({
    fct: '',
    entree: '',
    type: 'Scientific',
    dateBL: '',
    numeroBL: '',
  });

  const [data, setData] = useState([]);
  const [fctOptions, setFctOptions] = useState([]);
  const [entreeOptions, setEntreeOptions] = useState([]);
  const [searchEntree, setSearchEntree] = useState('');
  const [searchGlobal, setSearchGlobal] = useState('');
  const [editing, setEditing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axiosClient.get('/sanctum/csrf-cookie');
    axiosClient.get('/api/fonctionnaires')
      .then((response) => setFctOptions(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des fonctionnaires:', error));

    axiosClient.get('/api/entrees')
      .then((response) => setEntreeOptions(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des entrees:', error));

    axiosClient.get('/api/sorties')
      .then((response) => setData(response.data))
      .catch((error) => console.error('Erreur lors de la récupération des sorties:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddData = () => {
    if (!formData.fct || !formData.entree || !formData.dateBL || !formData.numeroBL) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    const newSortie = {
      fct_id: formData.fct,
      entree_id: formData.entree,
      type: formData.type,
      date_bl: formData.dateBL,
      numero_bl: formData.numeroBL,
    };

    if (editing) {
      axiosClient.put(`/api/sorties/${editing.id}`, newSortie)
        .then((response) => {
          const updatedData = data.map((item) =>
            item.id === editing.id ? response.data : item
          );
          setData(updatedData);
          setEditing(null);
          setFormData({
            fct: '',
            entree: '',
            type: 'Scientific',
            dateBL: '',
            numeroBL: '',
          });
        })
        .catch((error) => {
          console.error('Erreur lors de la modification de la sortie:', error);
          alert('Erreur lors de la modification!');
        });
    } else {
      axiosClient.post('/api/sorties', newSortie)
        .then((response) => {
          setData([...data, response.data]);
          setFormData({
            fct: '',
            entree: '',
            type: 'Scientific',
            dateBL: '',
            numeroBL: '',
          });
        })
        .catch((error) => {
          console.error('Erreur lors de l\'ajout de la sortie:', error);
          alert('Erreur lors de l\'ajout!');
        });

      axiosClient.get('/api/sorties')
        .then(response => {
          setData(response.data);
        });
    }
  };

  const handleEdit = (item) => {
    setFormData({
      fct: item.fct.id,
      entree: item.entree.id,
      type: item.type,
      dateBL: item.date_bl,
      numeroBL: item.numero_bl,
    });
    setEditing(item);
  };

  const handleDelete = (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette sortie ?')) {
      axiosClient.delete(`/api/sorties/${id}`)
        .then(() => {
          const updatedData = data.filter((item) => item.id !== id);
          setData(updatedData);
        })
        .catch((error) => {
          console.error('Erreur lors de la suppression de la sortie:', error);
          alert('Erreur lors de la suppression!');
        });
    }
  };

  const handleModify = (id) => {
    navigate(`/sortieline/${id}`);
  };

  return (
    <div className="App">
      <div className='Nv'>
        <h1 className="Class">Nouvelle Sortie :</h1>
        <hr />
      </div>

      
      <div style={{ margin: '20px 0' }}>
      <label  style={{marginLeft:'40px'}}>Rechercher :</label>
        <input
          type="text"
          placeholder="Rechercher dans les sorties..."
          value={searchGlobal}
          onChange={(e) => setSearchGlobal(e.target.value)}
          style={{ margin: '10px 0', padding: '5px', width: '300px' }}

        />
      </div>

      <table className='TE'>
        <thead>
          <tr>
            <th>ID</th>
            <th>FCT</th>
            <th>Entrée</th>
            <th>Type</th>
            <th>Date BL</th>
            <th>Numéro BL</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
            <td>
              <select
                name="fct"
                value={formData.fct}
                onChange={handleInputChange}
              >
                <option value="">-- Sélectionner FCT --</option>
                {fctOptions.map((fct) => (
                  <option key={fct.id} value={fct.id}>
                    {fct.responsable}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <input
                  type="text"
                  placeholder="Rechercher une entrée..."
                  value={searchEntree}
                  onChange={(e) => setSearchEntree(e.target.value)}
                  style={{ marginBottom: '5px', padding: '5px' }}
                />
                <select
                  name="entree"
                  value={formData.entree}
                  onChange={handleInputChange}
                >
                  <option value="">-- Sélectionner ID Entrée --</option>
                  {entreeOptions
                    .filter((entree) =>
                      String(entree.numFactBl).toLowerCase().includes(searchEntree.toLowerCase())
                    )
                    .map((entree) => (
                      <option key={entree.id} value={entree.id}>
                        {entree.numFactBl}
                      </option>
                    ))}
                </select>
              </div>
            </td>
            <td>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{ width: '80%', padding: '5px' }}
              >
                <option value="Scientific">Scientific</option>
                <option value="Informatique">Informatique</option>
                <option value="Mobilier et matériel bureau">Mobilier et matériel bureau</option>
                <option value="Matériel Enseignement">Matériel Enseignement</option>
                <option value="Divers">Divers</option>
              </select>
            </td>
            <td>
              <input
                type="date"
                name="dateBL"
                value={formData.dateBL}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="number"
                name="numeroBL"
                value={formData.numeroBL}
                onChange={handleInputChange}
                placeholder="Numéro BL"
              />
            </td>
            <td>
              <button className="add-btn" onClick={handleAddData}>
                <i className="ri-add-line"></i> {editing ? 'Modifier' : 'Ajouter'}
              </button>
            </td>
          </tr>

          {data.length === 0 ? (
            <tr>
              <td colSpan="7">Aucune donnée disponible</td>
            </tr>
          ) : (
            data
              .filter((item) => {
                const keyword = searchGlobal.toLowerCase();
                return (
                  String(item.id).includes(keyword) ||
                  (item.responsable && item.responsable.toLowerCase().includes(keyword)) ||
                  (item.numFactBL && item.numFactBL.toLowerCase().includes(keyword)) ||
                  (item.type && item.type.toLowerCase().includes(keyword)) ||
                  (item.date_bl && item.date_bl.toLowerCase().includes(keyword)) ||
                  String(item.numero_bl).includes(keyword)
                );
              })
              .map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.responsable}</td>
                  <td>{item.numFactBL}</td>
                  <td>{item.type}</td>
                  <td>{item.date_bl}</td>
                  <td>{item.numero_bl}</td>
                  <td>
                    <button className="edit-btn" onClick={() => handleModify(item.id)}>Modifier</button>
                    <button className="delete-btn" onClick={() => handleDelete(item.id)}>Supprimer</button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Sortie;