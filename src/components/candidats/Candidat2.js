// Candidat2.jsx
import React from 'react';
import '../candidatStyles.css';
import { addCandidate } from '../../ContractInteraction';
import { useEffect } from 'react';

const Candidat2 = () => {
  useEffect(() => {
    addCandidate('Candidat 2');
  }, [])
  return (
    <div className="candidat-container">
      <img src="/femme.webp" alt="Candidat 2" className="candidat-image" />
      <p className="candidat-title"> Candidat 2</p>
      <p className="candidat-text">
        "Ma candidature repose sur l'idée que la diversité est notre plus grande force. Je m'efforcerai de créer un environnement où chaque voix compte, où les idées novatrices sont encouragées et où la transparence prévaut. Ensemble, nous pouvons construire un avenir prometteur pour tous"
      </p>
    </div>
  );
};

addCandidate(Candidat2.name);

export default Candidat2;
