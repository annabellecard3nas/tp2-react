import CommentaireInput from "./CommentaireInput";
import CommentaireText from "./CommentaireText";
import "./SectionCommentaire.scss";

function SectionCommentaire({ commentaires, utilisateur, bandeActuelle ,snackbarOuvert}) {
  return (
    <div className="SectionCommentaire">
      <CommentaireInput bandeActuelle={bandeActuelle} utilisateur={utilisateur} snackbarOuvert={snackbarOuvert}/>
      <CommentaireText commentaires={commentaires} utilisateur={utilisateur} bandeActuelle={bandeActuelle} snackbarOuvert={snackbarOuvert} />
    </div>
  );
}

export default SectionCommentaire;
