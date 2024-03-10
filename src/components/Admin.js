import React, { useState } from 'react';

const adminsList = ["0xd3b1bB7F7958292B22001a642007c43322b62118", '0xAdminWallet2'];

const Admin = () => {
    const [votantsList, setVotantsList] = useState(["0xd3b1bB7F7958292B22001a642007c43322b62118", 'votant2', 'votant3']);
    const [newVotantKey, setNewVotantKey] = useState('');
    const [votantToRemove, setVotantToRemove] = useState('');

    const addVotant = () => {
        if (newVotantKey.trim() !== '') {
            setVotantsList(prevList => [...prevList, newVotantKey.trim()]);
            setNewVotantKey('');
        }
    };

    const removeVotant = () => {
        if (votantToRemove.trim() !== '') {
            setVotantsList(prevList => prevList.filter(votant => votant !== votantToRemove.trim()));
            setVotantToRemove('');
        }
    };

    return (
        <div style={{ margin: '20px 0', fontFamily: 'Arial, sans-serif' }}>
            <div style={{ marginBottom: '20px' }}>
                <h2>Liste des Admins</h2>
                <ul>
                    {adminsList.map((admin, index) => (
                        <li key={index}>{admin}</li>
                    ))}
                </ul>
            </div>

            <div style={{ marginBottom: '20px' }}>
                <h2>Liste des Votants</h2>
                <ul>
                    {votantsList.map((votant, index) => (
                        <li key={index}>{votant}</li>
                    ))}
                </ul>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Nouveau votant"
                    value={newVotantKey}
                    onChange={(e) => setNewVotantKey(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                />
                <button onClick={addVotant} style={{ padding: '8px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Ajouter un votant
                </button>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <select
                    value={votantToRemove}
                    onChange={(e) => setVotantToRemove(e.target.value)}
                    style={{ marginRight: '10px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
                >
                    <option value="">Sélectionner le votant à supprimer</option>
                    {votantsList.map((votant, index) => (
                        <option key={index} value={votant}>{votant}</option>
                    ))}
                </select>
                <button onClick={removeVotant} style={{ padding: '8px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Supprimer le votant sélectionné
                </button>
            </div>
        </div>
    );
};

export default Admin;
export { adminsList };
