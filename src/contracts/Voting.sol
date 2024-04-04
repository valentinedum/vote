// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;
import "./VotingToken.sol";

contract Voting {
    // Référence au contrat du token ERC20
    VotingToken public votingToken;

    // Structure de données pour représenter un candidat
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Mapping pour stocker les candidats par leur identifiant
    mapping(uint => Candidate) public candidates;

    // Variable pour garder le compte du nombre total de candidats
    uint public candidatesCount;

    // Mapping pour enregistrer les votants qui ont déjà voté
    mapping(address => bool) public voters;

    // Événement émis lorsqu'un vote est enregistré
    event VotedEvent(uint indexed _candidateId);

    bool public votingOpen;

    // Contrôle de l'état d'ouverture des votes
    modifier onlyWhenVotingOpen() {
        require(votingOpen, "Voting is not open");
        _;
    }

    // Fonction pour démarrer ou arrêter la période de vote
    function toggleVoting(bool _votingOpen) public {
        votingOpen = _votingOpen;
    }

    constructor(VotingToken _votingToken) {
        votingToken = _votingToken;
        // Initialisation du contrat d'élection
    }

    // Fonction pour ajouter un nouveau candidat
    function addCandidate(string memory _name) public {
        // Incrémentation du nombre de candidats
        candidatesCount++;
        // Ajout du candidat à la liste des candidats avec un identifiant unique
        candidates[candidatesCount] = Candidate(candidatesCount, _name, 0);
    }

    // Fonction pour permettre à un votant de voter pour un candidat
    function vote(uint _candidateId) public onlyWhenVotingOpen {
        // Vérifier si l'identifiant du candidat est valide
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");

        // Vérifier si le votant n'a pas déjà voté
        require(!voters[msg.sender], "You have already voted");

        // Vérifier si la personne peut voter et a un token
        require(votingToken.balanceOf(msg.sender) > 0, "Insufficient balance");

        // Marquer le votant comme ayant voté
        voters[msg.sender] = true;

        // Incrémenter le nombre de votes du candidat sélectionné
        candidates[_candidateId].voteCount++;

        // Déduire les tokens dépensés du solde du votant
        votingToken.transferFrom(msg.sender, address(this), 1);

        // Émettre l'événement VotedEvent pour notifier l'enregistrement du vote
        emit VotedEvent(_candidateId);
    }

    // Fonction pour distribuer les tokens aux votants
    function distributeTokens() public {
        // À implémenter selon vos besoins spécifiques
        // Cette fonction peut être utilisée pour distribuer des tokens aux votants après la fin de la période de vote
    }

    // Fonction pour permettre aux admins d'accéder à tous les voteCount
    function getVoteCount(uint _candidateId) public view returns (uint) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        return candidates[_candidateId].voteCount;
    }
}
