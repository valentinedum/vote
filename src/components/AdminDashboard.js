import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../AppContext';
import { getVoteCount, revealVotes } from '../ContractInteraction'; // Fonction pour obtenir les détails des votes

const AdminDashboard = () => {
  const { candidatsList } = useContext(AppContext);
  const [votes, setVotes] = useState({}); // State pour stocker les votes

  useEffect(() => {
    // Fonction asynchrone pour récupérer les détails des votes
    const fetchVotes = async () => {
      try {
        // Obtenir le nombre de votes pour chaque candidat
        const votesData = {};
        for (const candidat of candidatsList) {
          const voteCount = await getVoteCount(candidat.name); // Utilisez l'ID ou un autre identifiant unique pour chaque candidat
          votesData[candidat.name] = voteCount;
        }
        setVotes(votesData); // Mettre à jour le state avec les détails des votes
      } catch (error) {
        console.error('Erreur lors de la récupération des détails des votes :', error);
      }
    };

    // Appel de la fonction pour récupérer les détails des votes lors du montage du composant
    fetchVotes();
  }, [candidatsList]); // Exécutez cette fonction chaque fois que la liste des candidats change

  return (
    <div>
      {/* Affichage des votes */}
      <h3>Résultats du vote :</h3>
      <ul>
        {Object.entries(votes).map(([candidatName, voteCount]) => (
          <li key={candidatName}>
            {candidatName}: {voteCount}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
