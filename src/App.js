import React, { useState } from 'react';
import CompetenceSecteur from './components/CompetenceSecteur';
import AnalyseConstatation from './components/AnalyseConstatation';
import AdminPanel from './components/AdminPanel';

function App() {
  const [activeTab, setActiveTab] = useState('competence');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Analyse Constatation</h1>
      
      {/* Navigation */}
      <div className="flex space-x-2 mb-6">
        <button 
          onClick={() => setActiveTab('competence')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'competence' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Compétence Secteur
        </button>
        <button 
          onClick={() => setActiveTab('analyse')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'analyse' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Analyse Constatation
        </button>
        <button 
          onClick={() => setActiveTab('admin')}
          className={`px-4 py-2 rounded-lg transition-colors ${
            activeTab === 'admin' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          Administration
        </button>
      </div>

      {/* Contenu */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'competence' && <CompetenceSecteur />}
        {activeTab === 'analyse' && <AnalyseConstatation />}
        {activeTab === 'admin' && <AdminPanel />}
      </div>
    </div>
  );
}

export default App;
