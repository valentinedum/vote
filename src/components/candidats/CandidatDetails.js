import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import {AppContext} from "../../AppContext"


const CandidatDetails = () => {
  const { name } = useParams(); // Récupérer le nom du candidat depuis l'URL du Route
  const { candidatsList } = useContext(AppContext); // Accéder à la liste des candidats depuis le contexte global

  // Vérification des données
  console.log(candidatsList);
  console.log(name); 

  // Rechercher le candidat 
  const candidat = candidatsList.find(candidat => candidat.name === name);

  // Vérification du lien vers le candidat pour le développement
  if (!candidat) {
    return <div>Candidat non trouvé</div>;
  }

  return (
    <div className="candidat-container">
      <img src={candidat.photo} alt={candidat.name} className="candidat-image" />
      <p className="candidat-title"> {candidat.name}</p>
      <p className="candidat-text">{candidat.bio}</p>
    </div>
  );
};


export default CandidatDetails;
