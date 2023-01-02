import MathJax from "better-react-mathjax/MathJax";
import React, { useState } from "react";
import { ISolutionData } from "../classes/ResponseData";
import SolutionStep from "./SolutionStep";

export default function Solution (props: { data: ISolutionData | null }): JSX.Element {

    const [isShowingSteps, showSteps] = useState<boolean>(false);

    const { data } = props;

    if (data == null)
        return <></>

    return (
        <div className="solution-wrapper">
            <div className="input-output-latex">
                <MathJax dynamic> 
                    { `$$ ${data.simplifiedInputAsLatex} = ${data.outputAsLatex} $$` }
                </MathJax>
            </div>
            {
                isShowingSteps
                &&
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
            }
            <button onClick={() => showSteps(!isShowingSteps)}>
                { isShowingSteps ? "Lépések elrejtése" : "Lépések mutatása" }
            </button>
        </div>
    );
}