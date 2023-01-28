import IBackendPreferences from "../classes/BackendPreferenceTypes";
import { ISimplificationPreferences, IUserInterfacePreferences } from "../classes/FrontendPreferenceTypes";

export function SetPreferences (keyValuePairs: { [key: string]: any }): void {

    if (typeof window === 'undefined') {
        console.warn("localStorage is undefined, cannot use preferences!");
        return;
    }

    for (let key in keyValuePairs) {
        localStorage.setItem(key, JSON.stringify(keyValuePairs[key]));
    }
}

export function GetPreferences (key: string): any | undefined {

    if (typeof window === 'undefined') {
        console.warn("localStorage is undefined, cannot use preferences!");
        return;
    }

    const data = localStorage.getItem(key);

    if (data === null) {
        console.error(`Key '${key}' is not set in localStorage!`);
        return undefined;
    }

    return JSON.parse(data);
}

export function GetBackendPreferences(): IBackendPreferences | null {

    const simplificationPreferences: ISimplificationPreferences = GetPreferences("simplificationPreferences");

    if (simplificationPreferences === undefined)
        return null;

    let opsNotToEvaluate: string[] = [];
    
    if (simplificationPreferences.shouldEvalLogarithm == false)
        opsNotToEvaluate = opsNotToEvaluate.concat(["ln", "log"]);

    if (simplificationPreferences.shouldEvalTrig == false)
        opsNotToEvaluate = opsNotToEvaluate.concat([
            "sin", "cos", "tan", "cot", 
            "arcsin", "arccos", "arctan", "arccot"
        ])

    if (simplificationPreferences.shouldEvalHyp == false)
        opsNotToEvaluate = opsNotToEvaluate.concat([
            "sinh", "cosh", "tanh", "coth",
            "arsinh", "arcosh", "artanh", "arcoth"
        ])

    return {
        simplificationPreferences: {
            opsNotToEvaluate: opsNotToEvaluate
        }
    };
}

export function SetCSSThemeFromLocalStorage (): void {

    const UIPreferences: IUserInterfacePreferences = GetPreferences("UIPreferences");

    if (UIPreferences === undefined)
        console.warn("Cannot set UI preferences from local storage! Setting it to default...");

    const primaryColorDarkMode: string = "#2222AA";
    const secondaryColorDarkMode: string = "#AA22AA";
    const backgroundColorDarkMode: string = "#000000";
    const textColorDarkMode: string = "#FFFFFF";

    const primaryColorLightMode: string = "#2222AA";
    const secondaryColorLightMode: string = "#AA22AA";
    const backgroundColorLightMode: string = "#FFFFFF";
    const textColorLightMode: string = "#000000";

    // default is false
    if (UIPreferences?.darkMode ?? false) {   
        document.documentElement.style.setProperty("--primary-color", primaryColorDarkMode);
        document.documentElement.style.setProperty("--secondary-color", secondaryColorDarkMode);
        document.documentElement.style.setProperty("--background-color", backgroundColorDarkMode);
        document.documentElement.style.setProperty("--text-color", textColorDarkMode);
        
        console.log("Styles set to dark mode!");
    } else {
        document.documentElement.style.setProperty("--primary-color", primaryColorLightMode);
        document.documentElement.style.setProperty("--secondary-color", secondaryColorLightMode);
        document.documentElement.style.setProperty("--background-color", backgroundColorLightMode);
        document.documentElement.style.setProperty("--text-color", textColorLightMode);
        
        console.log("Styles set to light mode!");
    }
}