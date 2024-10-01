import './BandeImage.scss'
import bande from '../../admin/jse-3.png'
import { useState } from 'react';
import BandeAction from './BandeAction';

function BandeImage({setIndexActuel,indexActuel,bandes,imageBande, motsCles, datePub, aime, snackbarOuvert, utilisateur,bandeActuelle, setAime}) {

    //si  il  n'est pas au premiere Bande tu ne peu pas reculer
    const bandeRecul=()=>{
        if(indexActuel>0){
            setIndexActuel(indexActuel-1);
        }
    };

    //si il n'est pas au dernier tu peu avancer
    const bandeProchain=()=>{
        if(indexActuel < bandes.length-1){
            setIndexActuel(indexActuel+1);
        }
    };

    //mettre a la premiere bande (va  au debut)
    const bandePremiere=()=>{
        setIndexActuel(0);
    }

    //mettre a la derniere bande (va a la derniere)
    const bandeDerniere=()=>{
        setIndexActuel(bandes.length-1);
    }


    
    return (
        <div className='BandeImage'>
            
            <div className="imgWrapper">
                <img src={imageBande} alt={imageBande} />
            </div>

            <BandeAction 
                bandeRecul={bandeRecul}
                bandeProchain={bandeProchain}
                bandePremiere={bandePremiere}
                bandeDerniere={bandeDerniere}
                motsCles={motsCles}
                datePub={datePub}
                aime={aime}
                snackbarOuvert={snackbarOuvert}
                utilisateur={utilisateur}
                bandeActuelle={bandeActuelle}
                setAime={setAime}
            />
        </div>
    );
}

export default BandeImage;