import Head from "next/head";
import { useEffect, useState } from "react";
import { ISimplificationPreferences, IUserInterfacePreferences } from "../classes/FrontendPreferenceTypes";
import { GetPreferences, SetCSSThemeFromLocalStorage, SetPreferences } from "../scripts/Preferences";
import styles from "../styles/settings.module.css"

export default function Settings (): JSX.Element {

    const [simplificationPreferences, setSimplificationPreferences] = useState<ISimplificationPreferences>({
        shouldEvalLogarithm: false,
        shouldEvalTrig: true,
        shouldEvalHyp: true
    });

    const [UIPreferences, setUIPreferences] = useState<IUserInterfacePreferences>({
        darkMode: false
    });

    useEffect(() => {        

        const simpPref: ISimplificationPreferences = GetPreferences("simplificationPreferences");

        if (simpPref === undefined) {
            // setting default
            SetPreferences({ "simplificationPreferences": {
                shouldEvalLogarithm: false,
                shouldEvalTrig: true,
                shouldEvalHyp: true
            } as ISimplificationPreferences});
        } 
        else
            setSimplificationPreferences(simpPref);

        
        const UIPref: IUserInterfacePreferences = GetPreferences("UIPreferences");

        if (UIPref === undefined) {

            // setting default
            setUIPreferences({
                darkMode:  window.matchMedia('(prefers-color-scheme: dark)').matches
            });

            SetPreferences({
                "UIPreferences": {
                    darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches
                } as IUserInterfacePreferences
            })
        }
        else
            setUIPreferences(UIPref);
        
    }, []);
    
    const UpdateSimplificationPreferences = (key: string, value: any) => {

        const newValue: any = {
            ...simplificationPreferences
        };

        newValue[key] = value;

        setSimplificationPreferences(newValue);
        
        SetPreferences({"simplificationPreferences": newValue});
    };

    const UpdateUserInterfacePreferences = (key: string, value: any) => {

        const newValue: any = {
            ...UIPreferences
        };

        newValue[key] = value;

        setUIPreferences(newValue);
        
        SetPreferences({"UIPreferences": newValue});

        SetCSSThemeFromLocalStorage();
    };

    return (<>
        <Head>
            <title>Beállítások</title>
            <meta name="description" content="Formáld az oldal kimenetét és kinézetét tetszésedre!" />
        </Head>
        <main>

            <section className={styles.section}>

                <div className={styles.myContainer}>
                    <h1 className={styles.title}>Beállítások</h1>
                    <div className={styles.settingsHolder}>

                        <div className={styles.inputHolder}>
                            <p className={styles.inputTitle}>
                                Logaritmusok kiértékelése
                            </p>

                            <label className={styles.container}>
                                <input 
                                    type="checkbox" 
                                    checked={simplificationPreferences?.shouldEvalLogarithm}
                                    onChange={e => UpdateSimplificationPreferences("shouldEvalLogarithm", e.target.checked)}
                                    name="logarithm"
                                />
                                <span className={styles.checkmark}></span>
                            </label>

                        </div>
                        <div className={styles.inputHolder}>
                            <p>
                                Trigonometrikus függvények kiértékelése
                            </p>
                            <label className={styles.container}>
                                <input 
                                    type="checkbox" 
                                    checked={simplificationPreferences?.shouldEvalTrig}
                                    onChange={e => UpdateSimplificationPreferences("shouldEvalTrig", e.target.checked)}
                                    name="trig"
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>
                        <div className={styles.inputHolder}>
                            <p>
                                Hiperbolikus függvények kiértékelése
                            </p>  

                            <label className={styles.container}>
                                <input 
                                    type="checkbox" 
                                    checked={simplificationPreferences?.shouldEvalHyp}
                                    onChange={e => UpdateSimplificationPreferences("shouldEvalHyp", e.target.checked)}
                                    name="hyp"
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>

                        <div className={styles.inputHolder}>
                            <p>
                                Sötét mód
                            </p> 

                            <label className={styles.container}>
                                <input 
                                    type="checkbox" 
                                    checked={UIPreferences?.darkMode}
                                    onChange={e => UpdateUserInterfacePreferences("darkMode", e.target.checked)}
                                    name="darkmode"
                                />
                                <span className={styles.checkmark}></span>
                            </label>
                        </div>
                    </div>
                </div>  
            </section>

        </main>
    </>);
}