import React, { createContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [adminsList, setAdminsList] = useState(["0xd3b1bB7F7958292B22001a642007c43322b62118", '0xAdminWallet2']);
  const [votantsList, setVotantsList] = useState(["0xd3b1bB7F7958292B22001a642007c43322b62118", 'votant2', 'votant3']);
  const [candidatsList, setCandidatsList] = useState([
    { name: 'Candidat1', photo: '/homme.webp', bio: 'Biographie de Candidat1...' },
    { name: 'Candidat2', photo: '/femme.webp', bio: 'Biographie de Candidat2...' },
  ]);

  return (
    <AppContext.Provider value={{ adminsList, setAdminsList, votantsList, setVotantsList, candidatsList, setCandidatsList }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
