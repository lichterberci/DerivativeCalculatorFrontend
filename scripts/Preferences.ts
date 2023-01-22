import IBackendPreferences from "../classes/BackendPreferenceTypes";
import { ISimplificationPreferences } from "../classes/FrontendPreferenceTypes";

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