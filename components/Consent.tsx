import styles from "../styles/consent.module.css"
import { GetPreferences, SetPreferences } from "../scripts/Preferences"
import { useEffect, useState } from "react";

export default function Consent() : JSX.Element | null {

    const [userConsent, setUserConsent] = useState<boolean>();

    useEffect( ()=>{
        setUserConsent(GetPreferences("userConsent") ?? false);
    },[])

    const setConsent = () => {

        setUserConsent(true);
        SetPreferences({"userConsent" : true});
    }

    if ( userConsent == true) {
        return null;
    }

    return(
        <div className={styles.consentWrapper}
        >   
            <p className={styles.text}>
                Elfogadom az <a href="/aszf.html" target="_blank" style={{color: "white"}}>ÁSZF</a>-et, elfogadom a sütiket (kizárólag anlízis céljára vannak használva) és 
                beleegyezem, hogy nem fogom csalásra használni az oldal tartalmát.
            </p>
            <button className={styles.button} onClick={() => setConsent()} >Beleegyezem</button>
        </div>
    )
}