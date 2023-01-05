import MathJax from "better-react-mathjax/MathJax";
import React, { useState } from "react";
import { ISolutionData } from "../classes/ResponseData";
import SolutionStep from "./SolutionStep";
import styles from "../styles/Solution.module.css"

export default function Solution (props: { data: ISolutionData | null }): JSX.Element {

    const [isShowingSteps, showSteps] = useState<boolean>(false);

    const { data } = props;

    if (data == null)
        return <></>

    return (
        <div className={styles.solutionWrapper}>
            <div className={styles.solutionWrapperInner}>
                <div className="input-output-latex">
                    <MathJax dynamic className={styles.inputOutputMathJax}> 
                        { `$$ ${data.simplifiedInputAsLatex} = ${data.outputAsLatex} $$` }
                    </MathJax>
                </div>
                {
                    isShowingSteps
                    &&
                    <ul className={styles.stepList}>
                    {
                        data.stepsAsLatex.map((stepAsLatex: string, i: number) => 
                            <li key={i}>
                                <SolutionStep
                                    stepAsLatex = {stepAsLatex}
                                    stepDescription = {i < data.stepDescriptions.length ? data.stepDescriptions[i] : null}
                                    varToDiff = {data.varToDiff}
                                    isLast = {i == data.stepsAsLatex.length - 1}
                                />
                            </li>
                        )
                    }
                    </ul>
                }
            </div>
            <button className={styles.button} onClick={() => showSteps(!isShowingSteps)}>
                { isShowingSteps ? "Lépések elrejtése" : "Lépések mutatása" }
            </button>
        </div>
    );
}