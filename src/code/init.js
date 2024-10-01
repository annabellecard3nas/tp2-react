import objetConfig from './config';
import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider} from  "firebase/auth";
import {getFirestore} from 'firebase/firestore';

//initialiser les services de firebase (creer une reference a une appli)
export const appli = initializeApp(objetConfig);

//initialiser le fireStore
export const bd= getFirestore(appli);


//initialiser firebase authentification
export const firebaseAuth = getAuth(appli);

//initialiser l'authenfication avec google (GoogleAuthProvider)
export const googleAuthProvider = new GoogleAuthProvider();

//racourcie pour les collection  utilisateur 
export const collUtilisateurs="jse-utilisateurs";

//racourcie pour la collection bande
export const collBande="jse-bandes";

//racourcie pour la collection de commentaire
export const collCommentaire="commentaires";