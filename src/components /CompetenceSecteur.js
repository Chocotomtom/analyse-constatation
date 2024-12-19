import React, { useState, useEffect } from 'react';
import _ from 'lodash';

const CompetenceSecteur = () => {
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState('all');
  const [showCompanies, setShowCompanies] = useState(true);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('data/competences.json');
        if (!response.ok) {
          throw new Error('Impossible de charger les données');
        }
        const jsonData = await response.json();
        
        const detectedDepartments = Object.keys(jsonData[0])
          .filter(key => !isNaN(key) || (!key.includes('_') && !isNaN(key.trim())))
          .sort((a, b) => parseInt(a) - parseInt(b));
        
        setDepartments(detectedDepartments);
        
        const transformedData = jsonData.map(row => ({
          type: row['Type '],
          entreprise: row['Nom '],
          categorie: row['Catégorie compétence'],
          competence: row['Competences '],
          departments: _.pick(row, detectedDepartments)
        }));
        
        const uniqueTypes = [...new Set(transformedData.map(row => row.type))].filter(Boolean);
        setTypes(uniqueTypes);
        setData(transformedData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Chargement des données...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  const filteredData = selectedType === 'all' 
    ? data 
    : data.filter(row => row.type === selectedType);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <label className="block text-sm font-medium text-gray-700">Type:</label>
          <select
            className="mt-1 block w-64 rounded-md border-gray-300 shadow-sm"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="all">Tous les types</option>
            {types.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={showCompanies}
              onChange={(e) => setShowCompanies(e.target.checked)}
            />
            <span>Afficher les entreprises</span>
          </label>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                Catégorie/Compétence
              </th>
              {departments.map(dept => (
                <th key={dept} className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase">
                  {dept}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {/* Le contenu du tableau sera ajouté ici */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CompetenceSecteur;
