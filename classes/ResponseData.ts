import { IStepDescription } from "./StepDescription";

export interface ISolutionDataNullable {
    inputAsLatex: string | null;
    simplifiedInputAsLatex: string | null;
    outputAsLatex: string | null;
    stepsAsLatex: (string | null)[] | null;
    stepDescriptions: (IStepDescription | null)[] | null;
}

export interface ISolutionData {
    inputAsLatex: string;
    simplifiedInputAsLatex: string;
    outputAsLatex: string;
    stepsAsLatex: string[];
    stepDescriptions: (IStepDescription | null)[];
}