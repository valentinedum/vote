import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import Web3 from 'web3';
import { toggleVotingPeriod, distributeTokens, addCandidate } from '../ContractInteraction';
import AdminDashboard from './AdminDashboard';

const Admin = () => {
    
    const { adminsList, setAdminsList, votantsList, setVotantsList, candidatsList, setCandidatsList, votingPeriodActive, setVotingPeriodActive } = useContext(AppContext);
    const [buttonText, setButtonText] = useState(votingPeriodActive ? "Arrêter la période de vote" : "Commencer la période de vote");

    const [newCandidate, setNewCandidate] = useState({
        name: '',
        photo: '',
        bio: ''
    });

    const [newVotant, setNewVotant] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCandidate(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleAddCandidat = async () => {
        if (newCandidate.name.trim() !== '' && newCandidate.photo.trim() !== '' && newCandidate.bio.trim() !== '') {
            try {
                // Ajout du candidat en utilisant la fonction addCandidate du contrat intelligent
                await addCandidate(newCandidate.name);
                
                // Ajoutez le nouveau candidat à la liste localement
                setCandidatsList(prevList => [...prevList, newCandidate]);

                // Réinitialisez le formulaire
                setNewCandidate({ name: '', photo: '', bio: '' });
            } catch (error) {
                console.error('Error adding candidate:', error);
            }
        }
    };

    const handleAddVotant = () => {
        if (newVotant.trim() !== '') {
            // Ajoutez le nouveau votant à la liste
            setVotantsList(prevList => [...prevList, newVotant]);
            // Réinitialisez le formulaire
            setNewVotant('');

        }
    };

    const handleRemoveVotant = (index) => {
        // Supprimez le votant de la liste en utilisant son index
        setVotantsList(prevList => {
            const newList = [...prevList];
            newList.splice(index, 1);
            return newList;
        });
    };


    const handleToggleVotingPeriod = async () => {
        try {
          const newVotingPeriodActive = !votingPeriodActive; // Stocker le nouvel état de la période de vote dans une variable temporaire
          await toggleVotingPeriod(newVotingPeriodActive); // Inverser l'état actuel de la période de vote
          console.log(`Voting period toggled successfully`);
          setButtonText(newVotingPeriodActive ? "Arrêter la période de vote" : "Commencer la période de vote"); // Mettre à jour le texte du bouton en fonction de la variable temporaire
          setVotingPeriodActive(newVotingPeriodActive); // Mettre à jour l'état de la période de vote dans le composant avec la variable temporaire
          if (!votingPeriodActive) {
            // Si la période de vote vient d'être activée, distribuer les tokens aux votants
            await distributeTokens(); // Appeler la fonction distributeTokens pour distribuer les tokens aux votants
            console.log('Tokens distributed successfully');
          }
        } catch (error) {
          console.error('Error toggling voting period:', error);
        }
    };
    
    

    return (
        <div>
            {/* Liste des admins */}
            <h3>Liste des admins:</h3>
            <ul>
                {adminsList.map((admin, index) => (
                    <li key={index}>{admin}</li>
                ))}
            </ul>

            {/* Liste des votants */}
            <h3>Liste des votants:</h3>
            <ul>
                {votantsList.map((votant, index) => (
                    <li key={index}>
                        {votant}
                        <button onClick={() => handleRemoveVotant(index)} style={{marginLeft: '10px', backgroundColor: 'red', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>

            {/* Ajouter un votant */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px'}}>
                <input
                    type="text"
                    placeholder="Nouveau votant"
                    value={newVotant}
                    onChange={(e) => setNewVotant(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button onClick={handleAddVotant} style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Ajouter un votant
                </button>
            </div>

            {/* Liste des candidats */}
            <h3>Liste des candidats:</h3>
            <ul>
                {candidatsList.map((candidat, index) => (
                    <li key={index}>
                        {candidat.name}
                    </li>
                ))}
            </ul>

            {/* Ajouter un candidat */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px'}}>
                <input
                    type="text"
                    name="name"
                    placeholder="Nom du candidat"
                    value={newCandidate.name}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    name="photo"
                    placeholder="URL de la photo"
                    value={newCandidate.photo}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <input
                    type="text"
                    name="bio"
                    placeholder="Biographie"
                    value={newCandidate.bio}
                    onChange={handleInputChange}
                    style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button onClick={handleAddCandidat} style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Ajouter un candidat
                </button>
            </div>

            {/* Admin Dashboard */}
            <AdminDashboard />

            {/* Bouton pour commencer/arrêter la période de vote */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button onClick={handleToggleVotingPeriod} style={{ padding: '8px', backgroundColor: votingPeriodActive ? 'red' : 'green', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    {buttonText}
                </button>
            </div>

        </div>
    );
};

export default Admin;
