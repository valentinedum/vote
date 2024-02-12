// Candidat1.jsx
import React from 'react';
import '../candidatStyles.css';

const Candidat1 = () => {
  return (
    <div className="candidat-container">
      <img src="/homme.webp" alt="Candidat 1" className="candidat-image" />
      <p className="candidat-title"> Candidat 1</p>
      <p className="candidat-text">
        "En tant que candidat, je m'engage à œuvrer pour un avenir plus juste et équilibré. Ma vision repose sur l'innovation, l'inclusion et le progrès, et je suis déterminé(e) à représenter les intérêts de notre communauté avec intégrité et dévouement"
      </p>
    </div>
  );
};

export default Candidat1;
