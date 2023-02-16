import { IDifferentiationQueryBody, IExerciseQueryBody } from "../classes/BodyTypes";
import DifficultyLevel from "../classes/DifficultyLevel";
import type { ISolutionData, ISolutionDataNullable } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import { GoogleLogEvent } from "./GoogleAnalytics";
import { GetBackendPreferences, GetPreferences } from "./Preferences";
import ValidateResponse from "./ValidateResponse";

const API_URL = process.env.API_URL ?? "https://derivativecalculatorapi.azurewebsites.net";

export async function DifferentiateInput (input: string, signal: AbortSignal): Promise<ISolutionData | IResponseError> {

    const URL = `${API_URL}/differentiate/`;

    let response: Response;

    GoogleLogEvent("differentiate", {
        "input": input
    });

    if (input.trim() == "")
        return {
            type: "PARSING ERROR",
            message: "A bemenet üres!"
        };

    const body: IDifferentiationQueryBody = {
        input: input,
        preferences: GetBackendPreferences()
    };

    try {
        response = await fetch(URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body),
            signal: signal
        });
    } catch (err: any) {
        if (err.name == "AbortError")
            return {
                type: "ABORT ERROR",
                message: "Fetch aborted!"
            };

        console.error(err.message);

        return {
            type: "FETCH ERROR",
            message: err.message
        };
    }

    if (response.ok == false) {

        console.error(`Fetch unsuccessful: ${response.status} (${response.statusText})`);

        if (response.body == null)
            return {
                type: "UNKNOWN ERROR",
                message: "An error occurred!"
            };

        const result = await response.json() as ISolutionDataNullable;

        const { errorType, errorMessage } = result;

        if (errorType == null)
            return {
                type: "UNKNOWN ERROR",
                message: "An error occurred!"
            };

        console.error(`Error: ${errorMessage} (${errorType})`);

        return {
            type: errorType,
            message: errorMessage ?? "Hiba történt!"
        };
    }

    const result = await response.json() as ISolutionDataNullable;

    const error: IResponseError | null = ValidateResponse(result);

    if (error != null)
        return error;

    return result as ISolutionData;
}

export async function GenerateExercise (level: DifficultyLevel, signal: AbortSignal): Promise<ISolutionData | IResponseError> {

    const levelString = level.toLowerCase();

    const URL = `${API_URL}/generate-exercise/`;

    let response: Response;

    GoogleLogEvent("exercise", {
        "level": level
    });

    const body: IExerciseQueryBody = {
        level: levelString,
        difficultyMetrics: null,
        preferences: GetBackendPreferences()
    };

    try {
        response = await fetch(URL, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            signal: signal,
            body: JSON.stringify(body)
        });
    } catch (err: any) {
        if (err.name == "AbortError")
            return {
                type: "ABORT ERROR",
                message: "Fetch aborted!"
            };

        console.error(err.message);

        return {
            type: "FETCH ERROR",
            message: err.message
        };
    }

    if (response.ok == false) {

        console.error(`Fetch unsuccessful: ${response.status} (${response.statusText})`);

        if (response.body == null)
            return {
                type: "UNKNOWN ERROR",
                message: "An error occurred!"
            };

        const result = await response.json() as ISolutionDataNullable;

        const { errorType, errorMessage } = result;

        if (errorType == null)
            return {
                type: "UNKNOWN ERROR",
                message: "An error occurred!"
            };

        console.error(`Error: ${errorMessage} (${errorType})`);

        return {
            type: errorType,
            message: errorMessage ?? "Hiba történt!"
        };
    }

    const result = await response.json() as ISolutionDataNullable;

    const error: IResponseError | null = ValidateResponse(result);

    if (error != null)
        return error;

    return result as ISolutionData;
}