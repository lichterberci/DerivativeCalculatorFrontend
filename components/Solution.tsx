import MathJax from "better-react-mathjax/MathJax";
import React from "react";
import { ISolutionData } from "../classes/ResponseData";
import SolutionStep from "./SolutionStep";

export default function Solution (props: { data: ISolutionData | null }): JSX.Element {

    const { data } = props;

    if (data == null)
        return <></>

    return (
        <div className="solution-wrapper">
            <div className="input-output-latex">
                <MathJax dynamic> 
                    { `$$ ${data.simplifiedInputAsLatex} $$` }
                </MathJax>
            </div>
            <ul className="step-list">
            {
                data.stepsAsLatex.map((stepAsLatex: string, i: number) => 
                    <li key={i}>
                        <SolutionStep
                            stepAsLatex = {stepAsLatex}
                            stepDescription = {i < data.stepDescriptions.length ? data.stepDescriptions[i] : null}
                        />
                    </li>
                )   
            }
            </ul>
        </div>
    );
}