import DifficultyLevel, { GetDifficultyLevelString } from "../classes/DifficultyLevel";
import type { ISolutionData, ISolutionDataNullable } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import ValidateResponse from "./ValidateResponse";

const API_URL = process.env.API_URL ?? "https://derivativecalculatorapi.azurewebsites.net";

export async function DifferentiateInput (input: string): Promise<ISolutionData | IResponseError> {

    const URL = `${API_URL}/differentiate/${input}`;

    let response: Response;

    try {
        response = await fetch(URL);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }

    if (response.ok == false) {

        console.error(`Fetch unsuccessful: ${response.status} (${response.statusText})`);

        const errorType: string | null = response.headers.get("x-exception-type");
        const errorMessage: string | null = response.headers.get("x-exception-message");

        if (errorType == null || errorMessage == null)
            return {
                type: "UNKNOWN ERROR",
                message: "An error occurred!"
            };

        console.error(`Error: ${errorMessage} (${errorType})`);

        return {
            type: errorType,
            message: errorMessage
        };
    }

    const result = await response.json() as ISolutionDataNullable;

    const error: IResponseError | null = ValidateResponse(result);

    if (error != null)
        return error;

    return result as ISolutionData;
}

export async function GenerateExercise (level: DifficultyLevel): Promise<ISolutionData | IResponseError> {

    const levelString = level.toLowerCase();

    const URL = `${API_URL}/generate-exercise/${levelString}`;

    let response: Response;

    try {
        response = await fetch(URL);
    } catch (e: any) {
        console.error(e.message);
        throw e;
    }

    if (response.ok == false) {

        console.error(`Fetch unsuccessful: ${response.status} (${response.statusText})`);

        const errorType: string | null = response.headers.get("x-exception-type");
        const errorMessage: string | null = response.headers.get("x-exception-message");

        if (errorType == null || errorMessage == null)
            return {
                type: "UNKNOWN ERROR",
                message: "An error occurred!"
            };

        console.error(`Error: ${errorMessage} (${errorType})`);

        return {
            type: errorType,
            message: errorMessage
        };
    }

    const result = await response.json() as ISolutionDataNullable;

    const error: IResponseError | null = ValidateResponse(result);

    if (error != null)
        return error;

    return result as ISolutionData;
}