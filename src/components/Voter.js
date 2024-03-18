// Voter.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WalletContext } from '../WalletProvider'; 
import { AppContext } from '../AppContext';
import Web3 from 'web3';

const Voter = () => {
  const { walletConnected} = useContext(WalletContext);
  const {candidatsList} = useContext(AppContext);
  console.log(candidatsList);

  const web3 = new Web3(window.ethereum);

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
      {candidatsList.map(candidat => (
        <div key={candidat.name} style={candidateStyle}>
          <img src={candidat.photo} alt={candidat.name} style={imageStyle} />
          <p>{candidat.name}</p>
          {/* Render the button only if the user is connected */}
          {walletConnected ? (
            <Link to={`/components/candidats/Candidat${candidat.name}`} style={{ textDecoration: 'none' }}>
              <button>Voter maintenant</button>
            </Link>
          ) : (
            <p>Connectez-vous pour voter.</p>
            // You can replace this with any alternative content or message
          )}
        </div>
      ))}
    </div>
  );
};

export default Voter;

