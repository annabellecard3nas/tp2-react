import "./BandeAction.scss";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { IconButton } from "@mui/material";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { useEffect, useState } from "react";
import { observerAime, toggleAime, verifierAime } from "../code/aime-modele";
function BandeAction({
                        bandeRecul,
                        bandeProchain,
                        bandePremiere,
                        bandeDerniere,
                        motsCles,
                        datePub,
                        aime,
                        snackbarOuvert,
                        utilisateur,
                        bandeActuelle,
                        setAime
                      }) 
{
  // mettre les  like a false au debut car le coeur n'est pas liker quand tu charge la page
  const [like, setLike] = useState(false);

  useEffect(() => {
    // Fonction pour récupérer le statut du like
    const fetchLikeStatus = async () => {
        // Vérifie si l'utilisateur et l'ID de la bande actuelle sont définis
        if (utilisateur && bandeActuelle?.id) {
            // Récupère le statut du like pour l'utilisateur actuel et la bande actuelle
            const isLiked = await verifierAime(bandeActuelle.id, utilisateur.uid);
            // Met à jour le statut du like dans le state
            setLike(isLiked);
        }
    };

    // Vérifie si l'utilisateur et l'ID de la bande actuelle sont définis
    if (utilisateur && bandeActuelle?.id) {
        // Abonnement à observerAime pour détecter les changements de likes
        const desabonner = observerAime(bandeActuelle.id, (likes) => {
            // Met à jour les likes dans le state
            setAime(likes);
            // Vérifie si l'utilisateur actuel a aimé la bande actuelle
            setLike(likes.includes(utilisateur.uid));
        });

        // Appel de la fonction pour récupérer le statut du like
        fetchLikeStatus();

        // Retourne la fonction de désabonnement pour nettoyer lorsque les dépendances changent ou lorsque le composant est démonté
        return desabonner;
    }

    // Si les conditions pour l'abonnement à observerAime ne sont pas remplies, retourne une fonction vide
    return () => {};
}, [utilisateur, bandeActuelle]);



//pour savoir si il est liker ou pas
  const enchargeClickAime = async () => {
      if (utilisateur && bandeActuelle?.id) {
          await toggleAime(bandeActuelle.id, utilisateur.uid, like);
          setLike(!like);
      }
      else{
        snackbarOuvert();
      }
  }; 
  // console.log(motsCles);

  function formaterDate(dateString) {
    /**
     * La fonction prend une chaîne de caractères dateStr en entrée.
     * Elle extrait l'année,
     * le mois et
     * le jour
     * de cette chaîne de caractères en utilisant la méthode (slice)
     * pour découper la chaîne aux positions appropriées
     */

    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6) - 1; // Les mois commencent à 0 en JavaScript
    const day = dateString.slice(6, 8);

    /**
     * Elle crée un objet Date en utilisant les valeurs extraites de l'année,
     * du mois (en soustrayant 1 car en JavaScript les mois commencent à 0) et du jour.
     */
    const date = new Date(year, month, day);

    /**
     * Elle définit des options de formatage pour la date,
     * spécifiant qu'elle doit être affichée avec l'année, le mois et le jour sous forme de texte.
     */
    const options = { year: "numeric", month: "long", day: "numeric" };

    /**
     * Elle utilise Intl.DateTimeFormat pour formater la date en utilisant le format spécifié et la localisation fr-CA (français canadien).
     */
    const formattedDate = new Intl.DateTimeFormat("fr-CA", options).format(
      date
    );

    // Convertir la première lettre de chaque mot en majuscule
    return formattedDate.replace(/\b\w/g, (c) => c.toUpperCase());
  }

  return (
    <div className="BandeAction">
      <div className="infoBande">
        <p>{datePub && formaterDate(datePub)}</p>
        <p>
          {
            // ilf aut mettre un && car sinon il va mapper un undefined
            motsCles &&
              motsCles.map((motcle, index) => (
                <span key={index} className="motsCles">
                  #{motcle}
                </span>
              ))
          }
        </p>
      </div>
      <div className="flecheBande">
        <IconButton onClick={bandeDerniere}>
          <KeyboardDoubleArrowLeftIcon />
        </IconButton>

        <IconButton onClick={bandeProchain}>
          <KeyboardArrowLeftIcon />
        </IconButton>

        <IconButton onClick={bandeRecul}>
          <KeyboardArrowRightIcon />
        </IconButton>

        <IconButton onClick={bandePremiere}>
          <KeyboardDoubleArrowRightIcon />
        </IconButton>
      </div>
      <div className="likeBande">
        <IconButton onClick={enchargeClickAime}>
          {
            utilisateur?(like ? <FavoriteIcon /> : <FavoriteBorderIcon />)
              :
              <FavoriteBorderIcon />
          }
          
        </IconButton>
        <p>{aime && aime.length}</p>
        {/* <IconButton>
          <ChatBubbleIcon />
        </IconButton> */}
      </div>
    </div>
  );
}

export default BandeAction;
