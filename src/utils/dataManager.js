// Fonction pour sauvegarder les données dans le repo GitHub
export const saveData = async (jsonData) => {
  try {
    const response = await fetch('/api/save-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData)
    });
    
    if (!response.ok) {
      throw new Error('Erreur lors de la sauvegarde');
    }
    
    return true;
  } catch (error) {
    console.error('Erreur:', error);
    return false;
  }
};

// Fonction pour charger les données
export const loadData = async () => {
  try {
    const response = await fetch('/data/competences.json');
    if (!response.ok) {
      throw new Error('Erreur lors du chargement');
    }
    return await response.json();
  } catch (error) {
    console.error('Erreur:', error);
    return null;
  }
};
