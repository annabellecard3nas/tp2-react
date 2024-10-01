import { Avatar, Button } from "@mui/material";
import "./Entete.scss";
import { connexion, deconnexion } from "../code/utilisateur-modele";

function Entete({ utilisateur }) {




  return (
    <div className="Entete">
      <div className="logo">
        <p>JSE</p>
      </div>
      <div className="connexion">
        {utilisateur ? (
          <>
            {/* <p>{utilisateur.displayName}</p> */}
            <Avatar className="avatar" src={utilisateur.photoURL} alt={utilisateur.displayName}></Avatar>
            <Button variant="contained" onClick={deconnexion}>Déconnexion</Button>
          </>
        ) : (
          <>
            <Avatar className="avatar"></Avatar>
            <Button variant="contained" onClick={connexion}>Connexion</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default Entete;
