import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import {firebaseAuth, googleAuthProvider, bd, collUtilisateurs} from './init'
import {doc, setDoc} from 'firebase/firestore';




export function connexion(){
    signInWithPopup(firebaseAuth,googleAuthProvider)

}

export function deconnexion(){
    signOut(firebaseAuth);
}

export function observerEtatConnexion(mutateurUtilisateur){
    onAuthStateChanged(firebaseAuth, user=>{
        if(user){
            //je veux enregistrer les données de cette utilisateur dans fireStore 
            setDoc(
                    doc(bd, collUtilisateurs , user.uid),
                    {
                        nomComplet: user.displayName,//npm complet de lutilisateur
                        avatar: user.photoURL,// la photo de ton compte google
                        courriel: user.email,// email google
                        dcc: new Date().getTime()//date
                    },
                    //se merge n'est pas pour ecraser mais pour fusioner les informations
                    //car sinon il va suprimer le dossier et en cree un nouveau
                    {merge: true} 
                )
            
        }
        //va mettre user dans un mutateur (setUtilisateurs)
         mutateurUtilisateur(user)
        })
} 
