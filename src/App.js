import React, { useState } from 'react';
import CompetenceSecteur from './components/CompetenceSecteur';
import AnalyseConstatation from './components/AnalyseConstatation';
import AdminPanel from './components/AdminPanel';

function App() {
  const [activeTab, setActiveTab] = useState('competence');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Analyse Constatation</h1>
      <div className="flex space-x-2 mb-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'competence' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('competence')}
        >
          Compétence Secteur
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'analyse' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('analyse')}
        >
          Analyse Constatation
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'admin' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setActiveTab('admin')}
        >
          Administration
        </button>
      </div>
      <div>
        {activeTab === 'competence' && <CompetenceSecteur />}
        {activeTab === 'analyse' && <AnalyseConstatation />}
        {activeTab === 'admin' && <AdminPanel />}
      </div>
    </div>
  );
}

export default App;
