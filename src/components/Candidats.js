import React, { useContext } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { AppContext } from '../AppContext';
import Candidat1 from './candidats/Candidat1'; // Importez le composant Candidat1
import Candidat2 from './candidats/Candidat2'; // Importez le composant Candidat2
import CandidatDetails from './candidats/CandidatDetails';

const Candidats = () => {
  const { candidatsList } = useContext(AppContext); // Accédez à la liste des candidats depuis le contexte global

  const candidatContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    paddingTop: '50px',
  };

  const candidatStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    width: '400px',
    marginBottom: '20px',
    border: '1px solid #ddd',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  };

  const imageStyle = {
    borderRadius: '50%',
    width: '200px',
    height: 'auto',
    marginBottom: '10px',
  };

  const nameStyle = {
    fontWeight: 'bold',
    fontSize: '24px',
    margin: '0',
  };

  return (
    <div>
      <div style={candidatContainerStyle}>
        <div>
          {/* Affichez les candidats statiques et dynamiques */}
          {candidatsList.map((candidat, index) => (
            <Link key={index} to={`/components/candidats/${candidat.name}`} style={{ textDecoration: 'none', color: 'black' }}>
              <div style={candidatStyle}>
                <img src={candidat.photo} alt={candidat.name} style={imageStyle} />
                <p style={nameStyle}>{candidat.name}</p>
                <p style={{ textAlign: 'center' }}>Cliquez pour en savoir plus</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Candidats;
