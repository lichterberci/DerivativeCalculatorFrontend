import { StepDescription } from "./StepDescription";

export interface SolutionDataNullable {
    inputAsLatex: string | null;
    simplifiedInputAsLatex: string | null;
    outputAsLatex: string | null;
    stepsAsLatex: (string | null)[] | null;
    stepDescriptions: (StepDescription | null)[] | null;
}

export interface SolutionData {
    inputAsLatex: string;
    simplifiedInputAsLatex: string;
    outputAsLatex: string;
    stepsAsLatex: string[];
    stepDescriptions: (StepDescription | null)[];
}