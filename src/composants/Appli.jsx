import "./Appli.scss";
import BandeImage from "./BandeImage";
import Entete from "./Entete";
import SectionCommentaire from "./CommentaireFolder/SectionCommentaire";
import { useState } from "react";
import { useEffect } from "react";
import { observerEtatConnexion } from "../code/utilisateur-modele";
import { lireToutCommentaire } from "../code/commentaire-modele";
import { lireToutBandes } from "../code/bandes-modeles";
import { Snackbar } from "@mui/material";

function Appli() {
  const [utilisateur, setUtilisateur] = useState(null); // tu met null pour que RIEN soit dedans
  const [bandes, setBandes] = useState([]); //tableau vide par deffaut
  const [indexActuel, setIndexActuel] = useState(0); // pour mettre le tableau a 0= la premiere bande
  const [imageBande, setImageBande] = useState(null); //qu'il y ai rien dedans a la base
  const [motsCles, setMotsCles] = useState([]); //tableau vide
  const [datePub, setDatePub] = useState(""); // string vide
  const [aime, setAime] = useState([]);
  const [commentaires, setCommentaires] = useState([]);
  const [action,setAction] = useState(false)

  const bandeActuelle = bandes[indexActuel]; //prendre  information  de la bande actuelle

  ////////////////////////////  USE EFFECTS ////////////////////////
  //prend objet de authentification et check si l'utilisateur est loger sinon ca va  etre null
  useEffect(() => {
    observerEtatConnexion(setUtilisateur);
  }, [setUtilisateur]);

  //use effect pour muter liretout dans set bandes
  //se  fera 1 seul fois au debut
  useEffect(() => {
    lireToutBandes(setBandes);
  }, []);

  //use effect lier a la bande actuelle
  useEffect(() => {
    setImageBande(bandeActuelle?.url); //prendre url de l'image (bandeActuelle ? bandeActuelle.url:undefined)
    setMotsCles(bandeActuelle?.motsCles);
    setDatePub(bandeActuelle?.dpub);
    setAime(bandeActuelle?.aime);
    observerCommentaire();

  }, [bandes, indexActuel]);

  // useEffect(()=> {lireToutCommentaire()},[])

  ////////////////////////fonction/////////////////

  async function observerCommentaire() {
    const idBande = bandeActuelle?.id;
    if (idBande) {
      await lireToutCommentaire(idBande, setCommentaires);
    }
  }

  function snackbarFermer(){
    setAction(false)
  }

  function snackbarOuvert(){
    setAction(true);

  }

  ////////// Consoles.log ////////
  // console.log( "utilisateur", utilisateur);
  // console.log("index", indexActuel);
  // console.log("bande", bandes);
  // console.log("commentaire", commentaires);

  return (
    <div className="Appli">
      <Snackbar
        className='snackbar'
        autoHideDuration={2000}
        open={action}
        message="Veuillez vous connecter"
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={snackbarFermer}
      />
      <div className="video-bg">
        <video width="320" height="240" autoPlay loop muted>
          <source
            src="https://assets.codepen.io/3364143/7btrrd.mp4"
            type="video/mp4"
          />
          Votre navigateur ne supporte pas la vidéo.
        </video>
      </div>

      <Entete utilisateur={utilisateur} />

      <BandeImage
        setIndexActuel={setIndexActuel}
        indexActuel={indexActuel}
        bandes={bandes}
        imageBande={imageBande}
        motsCles={motsCles}
        datePub={datePub}
        aime={aime}
        snackbarOuvert={snackbarOuvert}
        utilisateur={utilisateur}
        bandeActuelle={bandeActuelle}
        setAime={setAime}
      />
      <SectionCommentaire
        commentaires={commentaires}
        utilisateur={utilisateur}
        bandeActuelle={bandeActuelle}
        snackbarOuvert={snackbarOuvert}
      />

    </div>
  );
}

export default Appli;
