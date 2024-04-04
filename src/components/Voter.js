import React, { useContext, useState, useEffect } from 'react';
import { WalletContext } from '../WalletProvider'; 
import { AppContext } from '../AppContext';
import { voteForCandidate, getVoteCount } from '../ContractInteraction';

const Voter = () => {
  const { walletConnected } = useContext(WalletContext);
  const { candidatsList, votingPeriodActive } = useContext(AppContext);
  const [message, setMessage] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Vérifiez si la période de vote est terminée
    if (!votingPeriodActive) {
      // Si la période de vote est terminée, récupérez les résultats du vote
      fetchResults();
    }
  }, [votingPeriodActive]);

  const fetchResults = async () => {
    // Récupérez les résultats du vote pour chaque candidat
    const voteResults = await Promise.all(
      candidatsList.map(async candidat => {
        const voteCount = await getVoteCount(candidat.id); // Supposons que chaque candidat a un identifiant unique
        return { ...candidat, voteCount };
      })
    );
    setResults(voteResults);
  };

  const handleVoteForCandidate = async (candidateId) => {
    try {
      const success = await voteForCandidate(candidateId);
      if (success) {
        setMessage(`Vous avez voté avec succès pour le candidat ${candidateId}.`);
        // Ajouter ici la logique pour mettre à jour l'interface utilisateur après le vote
      } else {
        setMessage(`Échec du vote pour le candidat ${candidateId}. Veuillez réessayer.`);
        // Ajouter ici la logique pour gérer les erreurs lors du vote
      }
    } catch (error) {
      setMessage(`Erreur lors du vote pour le candidat ${candidateId}: ${error.message}`);
      // Ajouter ici la logique pour gérer les erreurs lors du vote
    }
  };

  const voteContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: '100vh',
  };

  const candidateStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
  };

  const imageStyle = {
    borderRadius: '50%',
    width: '200px',
    height: 'auto',
    marginBottom: '10px',
  };

  return (
    <div style={voteContainerStyle}>
      <h2>Voter pour un candidat</h2>
      {/* Afficher le message */}
      {message && <p>{message}</p>}
      {results.length > 0 ? (
        <div>
          <h3>Résultats du vote</h3>
          {results.map(result => (
            <div key={result.id} style={candidateStyle}>
              <img src={result.photo} alt={result.name} style={imageStyle} />
              <p>{result.name}</p>
              <p>Nombre de votes : {result.voteCount}</p>
            </div>
          ))}
        </div>
      ) : (
        <div>
          {/* Afficher les candidats et le bouton de vote */}
          {candidatsList.map(candidat => (
            <div key={candidat.id} style={candidateStyle}>
              <img src={candidat.photo} alt={candidat.name} style={imageStyle} />
              <p>{candidat.name}</p>
              {/* Rendre le bouton uniquement si l'utilisateur est connecté */}
              {walletConnected && (
                <button onClick={() => handleVoteForCandidate(candidat.name)}>Voter maintenant</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Voter;
