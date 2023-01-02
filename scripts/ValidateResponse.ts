import { ISolutionDataNullable } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";

export default function ValidateResponse(response: ISolutionDataNullable): IResponseError | null {

    if (response == null) {
        console.error("Fetch result is null!");
        return {
            type: "INVALID RESPONSE DATA",
            message: "Fetch result is null!"
        };
    }

    if (response.inputAsLatex == null || response.simplifiedInputAsLatex == null || response.outputAsLatex == null) {
        console.error("Fetch result string is null!");
        return {
            type: "INVALID RESPONSE DATA",
            message: "Fetch result string is null!"
        };
    }

    if (response.stepsAsLatex == null) {
        console.error("Fetch result's steps are null!");
        return {
            type: "INVALID RESPONSE DATA",
            message: "Fetch result's steps are null!"
        };
    }

    if (response.stepsAsLatex.some(step => step == null)) {
        console.error("At least one step is null!");
        return {
            type: "INVALID RESPONSE DATA",
            message: "At least one step is null!"
        };
    }

    if (response.stepDescriptions == null) {
        console.error("Step description list is null!");
        return {
            type: "INVALID RESPONSE DATA",
            message: "Step description list is null!"
        };
    }

    return null;
}