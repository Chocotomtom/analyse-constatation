import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const AdminPanel = () => {
  const [uploading, setUploading] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setUploading(true);
      
      // Lire le fichier Excel
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: 'array' });
      
      // Convertir en JSON
      const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(firstSheet);

      // TODO: Implémenter la sauvegarde des données
      console.log('Données chargées:', jsonData);
      
      setLastUpdate(new Date().toLocaleString());
    } catch (error) {
      console.error('Erreur lors du chargement:', error);
      alert('Erreur lors du chargement du fichier');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Administration</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mettre à jour les données
          </label>
          <input
            type="file"
            accept=".xlsx,.xls"
            onChange={handleFileUpload}
            disabled={uploading}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {lastUpdate && (
          <p className="text-sm text-gray-500">
            Dernière mise à jour : {lastUpdate}
          </p>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
