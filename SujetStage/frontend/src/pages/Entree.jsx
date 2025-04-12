import React, { useState } from 'react';
import '../index.css';
import 'remixicon/fonts/remixicon.css';
import { useNavigate } from 'react-router-dom'; 
const Entree = () => {
  const [formData, setFormData] = useState({
    id: '',
    frs: '',
    type: 'Bon Commande',
    numero: '',
    numFactBL: '',
    observation: '',
    date: '',
  });
  const [data, setData] = useState([]);
  const navigate = useNavigate(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateUniqueId = () => {
    return data.length + 1;
  };

  const handleAddData = () => {
    if (!formData.frs || !formData.numero || !formData.date) {
      alert('Veuillez remplir tous les champs !');
      return;
    }

    const newId = generateUniqueId();
    const newData = { ...formData, id: newId };
    setData([...data, newData]);

 
    localStorage.setItem('data', JSON.stringify([...data, newData]));

    setFormData({
      id: '',
      frs: '',
      type: 'Bon Commande',
      numero: '',
      numFactBL: '',
      observation: '',
      date: '',
    });
  };

  const handleDelete = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
    localStorage.setItem('data', JSON.stringify(newData)); 
  };

  const handleModify = (id) => {
    navigate(`/entreeline/${id}`);
  };

  return (
    <div className="App" style={{ textAlign: 'center', margin: '20px' }}>
      <table style={{ borderCollapse: 'collapse', width: '80%', margin: '0 auto' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>FRS</th>
            <th>Type</th>
            <th>Numéro</th>
            <th>NumFactBL</th>
            <th>Observation</th>
            <th>Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
      
          <tr>
            <td></td>
            <td>
            <select
                    name="frs"
                    value={formData.frs}
                    onChange={handleInputChange}
                    style={{ width: '80%', padding: '5px' }}
                   >
                       <option value="">Choisissez FRS</option>
                       <option value="option1">Option 1</option>
                       <option value="option2">Option 2</option>
                        <option value="option3">Option 3</option>
                        </select>

            </td>
            <td>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                style={{ width: '80%', padding: '5px' }}
              >
                <option value="Bon Commande">Bon Commande</option>
                <option value="Bon Marche">Bon Marche</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
                placeholder="Numéro"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <input
                type="text"
                name="numFactBL"
                value={formData.numFactBL}
                onChange={handleInputChange}
                placeholder="NumFactBL"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <input
                type="text"
                name="observation"
                value={formData.observation}
                onChange={handleInputChange}
                placeholder="Observation"
                style={{ width: '80%', padding: '5px' }}
              />
            </td>
            <td>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
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
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.frs}</td>
                <td>{item.type}</td>
                <td>{item.numero}</td>
                <td>{item.numFactBL}</td>
                <td>{item.observation}</td>
                <td>{item.date}</td>
                <td>
                  <button className="edit-btn" onClick={() => handleModify(item.id)}>
                    <i className="ri-edit-box-line"></i> Modifier
                  </button>
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

export default Entree;