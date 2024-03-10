import React, { useState, createContext } from 'react';
import Web3 from 'web3';
import {Admin, adminsList} from './components/Admin'; // Importez la liste des admins depuis Admin.js

// Création du contexte pour le portefeuille
export const WalletContext = createContext(null);

// Composant fournisseur pour le WalletContext
export const WalletProvider = ({ children }) => {
  const [walletConnected, setWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  // Vérification de l'admin
  const [isAdmin, setIsAdmin] = useState(false);

  // Fonction pour connecter le portefeuille
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();

        if (accounts.length > 0) {
          setWalletConnected(true);
          setWalletAddress(accounts[0]);

        // Vérifiez si le wallet est celui de l'admin
        const isAdminWallet = adminsList.includes(accounts[0]);
        setIsAdmin(isAdminWallet);
        }
      } catch (error) {
        console.error("Erreur lors de la connexion au portefeuille : ", error);
      }
    } else {
      console.error("MetaMask n'est pas installé.");
    }
  };

  // Fonction pour déconnecter le portefeuille
  const disconnectWallet = () => {
    setWalletConnected(false);
    setWalletAddress('');
    setIsAdmin(false);
  }; 

  return (
    <WalletContext.Provider value={{ walletConnected, walletAddress, isAdmin, connectWallet, disconnectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
