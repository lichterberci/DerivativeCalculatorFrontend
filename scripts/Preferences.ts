import IBackendPreferences from "../classes/BackendPreferenceTypes";
import { ISimplificationPreferences, IUserInterfacePreferences } from "../classes/FrontendPreferenceTypes";
import { ITheme } from "../classes/Theme";

import THEMES from "../themes.json"

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
    
    const defaultTheme: string = process.env.DEFAULT_THEME ?? "dark";
    
    const themeName = UIPreferences === undefined ? 
                        defaultTheme : 
                        UIPreferences.darkMode ? 
                            "dark" : 
                            "light";

    const theme: ITheme | null | undefined = (THEMES as { [key: string]: ITheme })[themeName];

    if (theme == null) {
        console.error(`Theme ${themeName} does not exist, cannot set theme!`);
        return;
    }

    document.documentElement.style.setProperty("--primary-color", theme.primaryColor);
    document.documentElement.style.setProperty("--secondary-color", theme.secondaryColor);
    document.documentElement.style.setProperty("--tertiary-color", theme.tertiaryColor);
    document.documentElement.style.setProperty("--background-color", theme.backgroundColor);
    document.documentElement.style.setProperty("--text-color", theme.textColor);
    document.documentElement.style.setProperty("--dark-background-color", theme.darkBackgroundColor);
    document.documentElement.style.setProperty("--text-on-dark-background", theme.textOnDarkBackground);
    document.documentElement.style.setProperty("--scrollbar-active", theme.scrollbarActiveColor);
    document.documentElement.style.setProperty("--scrollbar-inactive", theme.scrollbarInactiveColor);
    document.documentElement.style.setProperty("--error-color", theme.errorColor);
    document.documentElement.style.setProperty("--team-card-background", theme.teamCardBackground);

    console.log(`Styles set to ${themeName}`);

}