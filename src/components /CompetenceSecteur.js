import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import { loadData } from '../utils/dataManager';
const CompetenceSecteur = () => {
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [showCompanies, setShowCompanies] = useState(true);
  const [departments, setDepartments] = useState(['06', '1', '13', '42', '59', '62', '69', '75', '77', '78', '83', '91', '92', '93', '94', '95']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await loadData();
      if (data) {
        // Transformer les données pour l'affichage
        const transformedData = data.map(row => ({
          type: row['Type '],
          entreprise: row['Nom '],
          categorie: row['Catégorie compétence'],
          competence: row['Competences '],
          departments: _.pick(row, departments)
        }));
        
        const uniqueTypes = [...new Set(transformedData.map(row => row.type))].filter(Boolean);
        setTypes(uniqueTypes);
        setData(transformedData);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [departments]);

  if (loading) return <div className="text-center p-4">Chargement...</div>;
  if (error) return <div className="text-red-500 p-4">Erreur: {error}</div>;

  return (
    <div>
      {/* Contrôles */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type :</label>
          <select 
            className="border rounded px-3 py-2"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Tous les types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-center">
          <input
            type="checkbox"
            id="showCompanies"
            className="mr-2"
