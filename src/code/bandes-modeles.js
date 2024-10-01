import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import { bd, collBande } from "./init"


// fonction pour lire tout les bandes [R]
export async function lireToutBandes(mutateur){
    //prend la collection dans jse-bandes
    return onSnapshot(query(collection(bd, collBande )

    //ordoner par date dajout du plus recent au plus ancient
    //dpub= date de publication
    ,orderBy("dpub","desc")),

    //ont  prend  ce que le snapshot a  comme resultat
    resultatSnap=>{
        //puis ont map le mapping de chaque document dont le id sont aleatoire
        const bandeFS=resultatSnap.docs.map(
            doc=> ({id:doc.id, ...doc.data()})
        )
        //puis ont le mute 
        mutateur(bandeFS)
    }
    )
}