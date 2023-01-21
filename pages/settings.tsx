import Head from "next/head";
import { useEffect, useState } from "react";
import { ISimplificationPreferences, IUserInterfacePreferences } from "../classes/FrontendPreferenceTypes";
import { GetPreferences, SetPreferences } from "../scripts/Preferences";

export default function Settings (): JSX.Element {

    const [simplificationPreferences, setSimplificationPreferences] = useState<ISimplificationPreferences>({
        shouldEvalLogarithm: false,
        shouldEvalTrig: true
    });

    const [UIPreferences, setUIPreferences] = useState<IUserInterfacePreferences>({
        darkMode: false
    });

    useEffect(() => {
          
        const simpPref: ISimplificationPreferences = GetPreferences("simplificationPreferences");
        setSimplificationPreferences(simpPref);

        const UIPref: IUserInterfacePreferences = GetPreferences("UIPreferences");
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
    };

    return (<>
        <Head>
            <title>Settings</title>
        </Head>
        <main>
    
            <input 
                type="checkbox"
                name="logarithm"
                checked={simplificationPreferences?.shouldEvalLogarithm}
                onChange={e => UpdateSimplificationPreferences("shouldEvalLogarithm", e.target.checked)}
            />
            Logaritmusok kiértékelése
            <br/>

            <input 
                type="checkbox"
                name="trig"
                checked={simplificationPreferences?.shouldEvalTrig}
                onChange={e => UpdateSimplificationPreferences("shouldEvalTrig", e.target.checked)}
            />
            Trigonometrikus függvények kiértékelése
            <br/>

            <input 
                type="checkbox"
                name="darkmode"
                checked={UIPreferences?.darkMode}
                onChange={e => UpdateUserInterfacePreferences("darkMode", e.target.checked)}
            />
            Sötét mód


        </main>
    </>);
}