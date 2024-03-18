import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';

const Admin = () => {
    const { adminsList, setAdminsList, votantsList, setVotantsList, candidatsList, setCandidatsList } = useContext(AppContext);

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

    const handleAddCandidat = () => {
        if (newCandidate.name.trim() !== '' && newCandidate.photo.trim() !== '' && newCandidate.bio.trim() !== '') {
            // Ajoutez le nouveau candidat à la liste
            setCandidatsList(prevList => [...prevList, newCandidate]);
            // Réinitialisez le formulaire
            setNewCandidate({ name: '', photo: '', bio: '' });
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
        </div>
    );
};

export default Admin;
