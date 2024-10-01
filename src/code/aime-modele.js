// like-modele.js
import { arrayRemove, arrayUnion, doc, getDoc, updateDoc, onSnapshot } from "firebase/firestore";
import { bd, collBande } from "./init";

// Fonction pour vérifier si un utilisateur a aimé une bande
export const verifierAime = async (bandeId, userId) => {
    const bandeRef = doc(bd, collBande, bandeId);
    //si il retourne quelque chose c'est true autrement c'est false
    const aimeArray = (await getDoc(bandeRef)).data()?.aime || [];
    return aimeArray.includes(userId);
};

// Fonction pour ajouter ou enlever un like
export const toggleAime = async (bandeId, userId, liked) => {
    const bandeRef = doc(bd, collBande, bandeId);

    if (liked) {
        await updateDoc(bandeRef, {
            aime: arrayRemove(userId)
        });
    } else {
        await updateDoc(bandeRef, {
            aime: arrayUnion(userId)
        });
    }
};

// Fonction pour écouter les changements en temps réel
export const observerAime = (bandeId, callback) => {
    const bandeRef = doc(bd, collBande, bandeId);
    return onSnapshot(bandeRef, (doc) => {
        callback(doc.data()?.aime || []);
    });
};