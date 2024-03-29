import React from 'react';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import { WalletProvider } from './WalletProvider';
import KryptoPote from './Kryptopote';
import Candidats from './components/Candidats';
import Voter from './components/Voter';
import Admin from './components/Admin'
import Candidat1 from './components/candidats/Candidat1';
import Candidat2 from './components/candidats/Candidat2';
import CandidatDetails from './components/candidats/CandidatDetails';

function App() {
  return (
    <NextUIProvider>
      <WalletProvider>
        <>
          <Header />
          <Routes>
            <Route path="/" element={<KryptoPote />} />
            <Route path="/components/Candidats" element={<Candidats />} />
            <Route path="/components/Voter" element={<Voter />} />
            <Route path="/components/Admin" element={<Admin />} /> 
            <Route path="/components/candidats/Candidat1" element={<Candidat1 />} />
            <Route path="/components/candidats/Candidat2" element={<Candidat2 />} />
            <Route path="/components/candidats/:name" element={<CandidatDetails />} /> {/* Route dynamique */}
          </Routes>
          <Footer />
        </>
      </WalletProvider>
    </NextUIProvider>
  );
}

export default App;
