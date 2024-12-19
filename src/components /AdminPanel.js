import React, { useState } from 'react';
import * as XLSX from 'xlsx';

const AdminPanel = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setStatus('Traitement du fichier...');

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]);
        
        // Ici, vous pouvez ajouter la logique pour sauvegarder les données
        console.log('Données traitées:', jsonData);
        
        setStatus('Fichier traité avec succès!');
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      setStatus('Erreur: ' + error.message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold mb-4">Administration</h2>
      
      <div className="border rounded p-4">
        <h3 className="font-medium mb-2">Mise à jour des données</h3>
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileUpload}
          disabled={isUploading}
          className="block w-full text-sm text-gray-500 mb-4"
        />
        {status && (
          <div className="text-sm text-gray-600">
            {status}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
