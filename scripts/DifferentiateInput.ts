import type { SolutionData, SolutionDataNullable } from "../classes/ResponseData";

const API_URL = process.env.API_URL ?? "https://derivativecalculatorapi.azurewebsites.net";

export async function DifferentiateInput (input: string): Promise<SolutionData | null> {

    const URL = `${API_URL}/differentiate/${input}`;    

    let response: Response;

    try {
        response = await fetch(URL);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }

    if (response.ok == false) {
        console.error(`Fetch error: ${response.status} (${response.statusText})`);
        return null;
    }

    const result = await response.json() as SolutionDataNullable;

    if (result == null) {
        console.error("Fetch result is null!");
        return null;
    }

    if (result.inputAsLatex == null || result.simplifiedInputAsLatex == null || result.outputAsLatex == null) {
        console.error("Fetch result string is null!");
        return null;
    }

    if (result.stepsAsLatex == null) {
        console.error("Fetch result's steps are null!");
        return null;
    }

    if (result.stepsAsLatex.some(step => step == null)) {
        console.error("At least one step is null!");
        return null;
    }

    if (result.stepDescriptions == null) {
        console.error("Step description is null!");
        return null;
    }

    return result as SolutionData;
}