import MathJax from "better-react-mathjax/MathJax/MathJax";
import { useState } from "react";
import { IStepDescription } from "../classes/StepDescription";
import StepDescription from "./StepDescription";

export default function SolutionStep (props: { stepAsLatex: string, stepDescription: IStepDescription | null }): JSX.Element {
    
    const { stepAsLatex, stepDescription } = props;
    
    const [isShowingDescription, setIsSwohingDescription] = useState<boolean>(false);

    return (
        <div className="step-holder">
            <div className="step-latex">
                <MathJax dynamic>
                    { `$$ ${stepAsLatex} $$` }
                </MathJax>
            </div>
            {
                isShowingDescription && <StepDescription stepDescription={stepDescription} />
            }
        </div>
    );
};