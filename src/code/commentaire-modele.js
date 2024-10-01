import { collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, setDoc, updateDoc } from "firebase/firestore";
import { bd, collBande, collCommentaire } from "./init";




// fonction pour lire tout les commentaire [R]
export async function lireToutCommentaire(idBande,mutateur){
    //idBande est le nom quon a donner au document avec des id generer automatiquement
    //pour ensuite avoir acces a la collection commentaire 
    return onSnapshot(query(collection(bd ,collBande, idBande, collCommentaire)

    //ordoner par date dajout du plus recent au plus ancient
    ,orderBy("timestamp","desc")),

    //ont  prennd  ce que le snapshot a  comme resultat
    resultatSnap=>{
        //puis ont le map
        const commentairesFS=resultatSnap.docs.map(
            doc=> ({id:doc.id, ...doc.data()})
        )
        //puis ont le mute en
        mutateur(commentairesFS)
    }
    )
}

/// fonction pour ecrire un commentaire (C)
export async function ecrireCommentaire(idBande, infoCommentaire){
    const commentaireRef= doc(collection( bd, 
                                          collBande,
                                          idBande,
                                          collCommentaire
                                        ) );  
    
    await setDoc(commentaireRef, infoCommentaire);
    return commentaireRef.id

}


///fonction pour effacer un commentaire a nous (D)
export async function supprimerCommentaire(idBande, idCommentaire){
    const commentaireRef= doc(bd,collBande, idBande ,collCommentaire, idCommentaire)
    return await deleteDoc(commentaireRef)

}

// fonction pour ajouter un like (C)(U)
export async function ajouterLike(idBande, idCom, util, vote) {
    const commentaireRef = doc(bd, collBande, idBande, collCommentaire, idCom);
    const commentaireDoc = await getDoc(commentaireRef);

    const refDossier = commentaireDoc.data();
    const nouveauVote = { ...refDossier.votes };

    if (nouveauVote[util] === vote) {
        delete nouveauVote[util];
    } else {
        nouveauVote[util] = vote;
    }

    await updateDoc(commentaireRef, { votes: nouveauVote });
}