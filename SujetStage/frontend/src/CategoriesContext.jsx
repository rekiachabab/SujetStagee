// CategoriesContext.js
import React, { createContext, useState } from 'react';

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [type, setType] = useState('Consommable');
  const [category, setCategory] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingData, setEditingData] = useState({ id: '', type: 'Consommable', category: '' });

  const generateUniqueId = () => {
    return data.length + 1;
  };

  const handleAddData = () => {
    if (category.trim() === '') {
      alert('Please enter a value for Category!');
      return;
    }

    const newId = generateUniqueId();
    setData([...data, { id: newId, type, category }]);
    setType('Consommable');
    setCategory('');
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
    if (editingData.category.trim() === '') {
      alert('Please enter a value for Category to update!');
      return;
    }
    const newData = [...data];
    newData[index] = editingData;
    setData(newData);
    setEditingIndex(null);
    setEditingData({ id: '', type: 'Consommable', category: '' });
  };

  return (
    <CategoriesContext.Provider
      value={{
        type,
        setType,
        category,
        setCategory,
        data,
        setData,
        editingIndex,
        setEditingIndex,
        editingData,
        setEditingData,
        handleAddData,
        handleDelete,
        handleEdit,
        handleSave
      }}
    >
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesContext;
