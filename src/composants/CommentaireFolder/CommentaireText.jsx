import { useEffect, useState } from 'react';
import './CommentaireText.scss'; 
import PouceBasInactifIcon from '@mui/icons-material/ThumbDownOffAlt'; 
import PouceBasActifIcon from '@mui/icons-material/ThumbDownAlt'; 
import PouceHautInactifIcon from '@mui/icons-material/ThumbUpOffAlt'; 
import PouceHautActifIcon from '@mui/icons-material/ThumbUpAlt'; 
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton'; 
import { ajouterLike, supprimerCommentaire } from '../../code/commentaire-modele'; // Import des fonctions pour ajouter un like et supprimer un commentaire depuis le modèle

function CommentaireText({ commentaires, utilisateur, snackbarOuvert, bandeActuelle }) {
    const [votes, setVotes] = useState({}); // État pour stocker les votes des commentaires

    // Fonction pour formater la date
    function formaterDate(timestamp) {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return date.toLocaleDateString(undefined, options);
    }

    // Effet pour initialiser les votes lorsque les commentaires changent
    useEffect(() => {
        const votesInitiaux = commentaires.reduce((acc, commentaire) => {
            if (commentaire.votes && commentaire.votes[utilisateur?.uid]) {
                acc[commentaire.id] = commentaire.votes[utilisateur.uid] === 1 ? 'haut' : 'bas';
            } else {
                acc[commentaire.id] = null;
            }
            return acc;
        }, {});
        setVotes(votesInitiaux);
    }, [commentaires, utilisateur]);

    // Fonction pour gérer le vote positif
    const gestionUpvote = async (id) => {
        if (!utilisateur) { // Vérifie si l'utilisateur est connecté
          snackbarOuvert(); // Ouvre le snackbar pour informer l'utilisateur de se connecter
            return;
        }
        const nouveauVote = votes[id] === 'haut' ? null : 'haut'; // Inverse le vote si l'utilisateur vote à nouveau
        setVotes(prevVotes => ({
            ...prevVotes,
            [id]: nouveauVote
        }));
        await ajouterLike(bandeActuelle.id, id, utilisateur.uid, nouveauVote === 'haut' ? 1 : 0); // Appel à la fonction pour ajouter le like
    };

    // Fonction pour gérer le vote négatif
    const gestionDownvote = async (id) => {
        if (!utilisateur) { // Vérifie si l'utilisateur est connecté
          snackbarOuvert(); // Ouvre le snackbar pour informer l'utilisateur de se connecter
            return;
        }
        const nouveauVote = votes[id] === 'bas' ? null : 'bas'; // Inverse le vote si l'utilisateur vote à nouveau
        setVotes(prevVotes => ({
            ...prevVotes,
            [id]: nouveauVote
        }));
        await ajouterLike(bandeActuelle.id, id, utilisateur.uid, nouveauVote === 'bas' ? -1 : 0); // Appel à la fonction pour ajouter le dislike
    };

    // Fonction pour gérer la suppression d'un commentaire
    const gestionSuppression = async (id) => {
        await supprimerCommentaire(bandeActuelle.id, id); // Appel à la fonction pour supprimer le commentaire
        // setCommentaires(prevCommentaires => prevCommentaires.filter(commentaire => commentaire.id !== id)); // Mettre à jour les commentaires locaux si nécessaire
    };
    return (
        <div className='CommentaireText'>
            {commentaires.map(commentaire => {
                const vote = votes[commentaire.id];
                const estCommentaireUtilisateur = utilisateur && commentaire.nomUtil === utilisateur.displayName;
                return (
                    <div className="textCom" key={commentaire.id}>
                        <div className="info">
                            <p>{commentaire.nomUtil}</p>
                            <p>{formaterDate(commentaire.timestamp)}</p>
                        </div>
                        <p>{commentaire.texte}</p>
                        <div className="vote">
                            <IconButton onClick={() => gestionUpvote(commentaire.id)}>
                                {vote === 'haut' ? <PouceHautActifIcon /> : <PouceHautInactifIcon />}
                            </IconButton>
                            <span>{Object.values(commentaire.votes).filter(v => v === 1).length}</span>
                            <IconButton onClick={() => gestionDownvote(commentaire.id)}>
                                {vote === 'bas' ? <PouceBasActifIcon /> : <PouceBasInactifIcon />}
                            </IconButton>
                            <span>{Object.values(commentaire.votes).filter(v => v === -1).length}</span>
                        </div>
                        {estCommentaireUtilisateur && (
                            <div className='suppression'>
                                <IconButton onClick={() => gestionSuppression(commentaire.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}

export default CommentaireText;