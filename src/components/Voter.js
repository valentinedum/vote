// Voter.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { WalletContext } from '../WalletProvider';  // Update the path based on your folder structure

const candidates = [
  { id: 1, name: 'Candidat 1', image: '/homme.webp' },
  { id: 2, name: 'Candidat 2', image: '/femme.webp' },
  // Add more candidates as needed
];

const Voter = () => {
  const { walletConnected } = useContext(WalletContext);

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
      {candidates.map(candidate => (
        <div key={candidate.id} style={candidateStyle}>
          <img src={candidate.image} alt={candidate.name} style={imageStyle} />
          <p>{candidate.name}</p>
          {/* Render the button only if the user is connected */}
          {walletConnected ? (
            <Link to={`/components/candidats/Candidat${candidate.id}`} style={{ textDecoration: 'none' }}>
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

