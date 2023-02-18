import {  } from "../scripts/Preferences"
import styles from "../styles/consent.module.css"
import { GetPreferences, SetPreferences } from "../scripts/Preferences"
import { useEffect, useState } from "react";
import { JsxAttribute } from "typescript";

export default function Consent() : JSX.Element | null {

    const [userConsent, setUserConsent] = useState<boolean>();

    useEffect( ()=>{
        setUserConsent(GetPreferences("userConsent"));
    },[])

    const setConsent = () => {

        setUserConsent(true);
        SetPreferences({userConsent : true});
    }

    if ( userConsent == true) {
        return null;
    }

    return(
        <div className={styles.consentWrapper}
        >   
            <p className={styles.text}>Beleegyezem, hogy nem fogom csalásra használni.</p>
            <button className={styles.button} onClick={() => setConsent()} >Beleegyezem</button>
        </div>
    )
}