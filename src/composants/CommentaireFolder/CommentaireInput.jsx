import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import "./CommentaireInput.scss";
import { ecrireCommentaire } from "../../code/commentaire-modele";
import { useState } from "react";

function CommentaireInput({ bandeActuelle, utilisateur, snackbarOuvert}) {
  const [commentaireTexte, setCommentaireTexte] =useState('')


  const gererEnvoyer = async () => {
    if(!utilisateur){
        snackbarOuvert();
        return;
    }

    if(commentaireTexte.trim()==''){
        return;
    }
    const nouveauxCommentaire = {
      idUtil: utilisateur.uid,
      nomUtil: utilisateur.displayName,
      texte: commentaireTexte,// la const commentaire texte
      timestamp: Date.now(),
      votes: {},
    };
    await ecrireCommentaire(bandeActuelle?.id, nouveauxCommentaire);
    setCommentaireTexte('');//enlever le  message que ta ecrie sure la barre de commentaire
  };

  return (
    <div className="CommentaireInput">
      <TextField
        variant="filled"
        value={commentaireTexte}
        onChange={(e) => setCommentaireTexte(e.target.value)}
        placeholder="ecrire un commentaire"
      />
      <Button variant="contained" onClick={gererEnvoyer}>
        <SendIcon />
      </Button>
    </div>
  );
}

export default CommentaireInput;
