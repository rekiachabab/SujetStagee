import React, { useState } from "react";
import '../index.css';  
import 'remixicon/fonts/remixicon.css';

function Sortie() {
  const [sorties, setSorties] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    fct: "",
    entree: "",  
    type: "",
    DateBL: "",  
    numeroBL: "",
    sortie: "",
    art: "",
    NumInvent: "",
    quantite: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

   
    if (name === 'numeroBL' && value !== '' && isNaN(value)) {
      return; 
    }
    
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDelete = (id) => {
    setSorties(sorties.filter((sortie) => sortie.id !== id));
  };

  const handleModify = (id) => {
    const entryToModify = sorties.find((sortie) => sortie.id === id);
    setFormData(entryToModify);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      
      const updatedEntries = sorties.map((sortie) =>
        sortie.id === formData.id ? formData : sortie
      );
      setSorties(updatedEntries);
    } else {
      
      const newEntry = { ...formData, id: sorties.length + 1 };
      setSorties([...sorties, newEntry]);
    }
    
    setFormData({
      id: "",
      fct: "",
      entree: "",
      type: "",
      DateBL: "",
      numeroBL: "",
      sortie: "",
      art: "",
      NumInvent: "",
      quantite: ""
    });
  };

  return (
    <div className="App">
      <h2>{formData.id ? "Modifier  une Sortie" : "Ajouter une Sortie"}</h2>

      {formData.id && (
        <div className="card">
          <h3>Détails de Sortie</h3>
          <p><strong>ID:</strong> {formData.id}</p>
          <p><strong>Fct:</strong> {formData.fct}</p>
          <p><strong>Entree:</strong> {formData.entree}</p>
          <p><strong>Type:</strong> {formData.type}</p>
          <p><strong>DateBL:</strong>{formData.DateBL}</p>
          <p><strong>NumeroBl:</strong> {formData.numeroBL}</p>
        </div>
      )}

      <form className="form" onSubmit={handleSubmit}>
        {formData.id && (
          <div className="cardd">
            <h3>Modifier Sortie</h3>
            <label className="lable">
              Sortie:
              <select
                className="input"
                name="sortie"
                value={formData.sortie}
                onChange={handleInputChange}
                required
              >
                <option value="">Choisir Sortie</option>
                <option value="sortie1">Sortie 1</option>
                <option value="sortie2">Sortie 2</option>
                <option value="sortie3">Sortie 3</option>
              </select>
            </label>
            <br />
            <label className="lable">
              Art:
              <select
                className="input"
                name="art"
                value={formData.art}
                onChange={handleInputChange}
                required
              >
                <option value="">Choisir l'Art</option>
                <option value="Art1">Art 1</option>
                <option value="Art2">Art 2</option>
                <option value="Art3">Art 3</option>
              </select>
            </label>
            <br />
            <label className="lable">
              Quantité:
              <input
                className="input"
                type="number"
                name="quantite"
                value={formData.quantite}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label className="lable">
              NumInvent:
              <input
                className="input"
                type="number"
                name="NumInvent"
                value={formData.NumInvent}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
          </div>
        )}

        {!formData.id && (
          <div>
            <h3>Ajouter une Sortie</h3>
            <label className="lable">
              Fct:
              <select
                className="input"
                name="fct"
                value={formData.fct}
                onChange={handleInputChange}
                required
              >
                <option value="">Choisir Fct</option>
                <option value="Fct1">Fct 1</option>
                <option value="Fct2">Fct 2</option>
                <option value="Fct3">Fct 3</option>
              </select>
            </label>
            <br />
            <label className="lable">
              Entree:
              <select
                className="input"
                name="entree"
                value={formData.entree}
                onChange={handleInputChange}
                required
              >
                <option value="Bon Commande">Choisir</option>

                <option value="Bon Commande">1</option>
                <option value="Retour">2</option>
                <option value="Échange">3</option>
              </select>
            </label>
            <br />
            <label className="lable">
              Type:
              <select
                className="input"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Choisir le Type</option>
                <option value="Scientific">Scientific</option>
                <option value="Informatique">Informatique</option>
                <option value="Mobilier et matériel bureau">Mobilier et matériel bureau</option>
                <option value="Matériel Enseignement">Matériel Enseignement</option>
                <option value="Divers">Divers</option>
              </select>
            </label>
            <br />
            <label className="lable">
              DateBL:
              <input
                className="input"
                type="date"
                name="DateBL"
                value={formData.DateBL}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
            <label className="lable">
              NumeroBl:
              <input
                className="input"
                type="number"
                name="numeroBL"
                value={formData.numeroBL}
                onChange={handleInputChange}
                required
              />
            </label>
            <br />
          </div>
        )}

        <button className="button" type="submit">
          {formData.id ? (
            <i className="ri-edit-box-line">Modifier</i>
          ) : (
            <i className="ri-add-line">Ajouter</i>
          )}
        </button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Fct</th>
            <th>Entree</th>
            <th>Type</th>
            <th>DateBL</th>
            <th>NumeroBL</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sorties.length === 0 ? (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                Aucune donnée disponible
              </td>
            </tr>
          ) : (
            sorties.map((sortie) => (
              <tr key={sortie.id}>
                <td>{sortie.id}</td>
                <td>{sortie.fct}</td>
                <td>{sortie.entree}</td>
                <td>{sortie.type}</td>
                <td>{sortie.DateBL}</td>
                <td>{sortie.numeroBL}</td>
                <td>
                  <button
                    className="edit-btn"
                    onClick={() => handleModify(sortie.id)}
                  >
                    <i className="ri-edit-box-line"></i> Modifier
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(sortie.id)}
                  >
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
}

export default Sortie;
