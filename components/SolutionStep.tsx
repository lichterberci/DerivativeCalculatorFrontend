import MathJax from "better-react-mathjax/MathJax/MathJax";
import { useState } from "react";
import { IStepDescription } from "../classes/StepDescription";
import StepDescription from "./StepDescription";
import styles from "../styles/SolutionStep.module.css";
import classnames from "classnames";

export default function SolutionStep (
    props: { 
        stepAsLatex: string, 
        stepDescription: IStepDescription | null, 
        varToDiff: string 
    }
): JSX.Element 
{
    
    const { stepAsLatex, stepDescription, varToDiff } = props;
    
    const [isShowingDescription, setIsShowingDescription] = useState<boolean>(false);

    return (
        <div 
            className={[styles.stepHolder, stepDescription != null ? styles.stepHover : ""].join(" ")}
            onClick={() => setIsShowingDescription(!isShowingDescription)}
        >
            <div className={styles.stepLatex}>
                <MathJax  
                    className={[styles.stepMathJax, stepDescription != null ? "" : styles.stepMathJaxLast].join(" ")}
                    dynamic>
                    { `$$ ${stepAsLatex} $$` }
                </MathJax>
            </div>
            {
                isShowingDescription && <StepDescription stepDescription={stepDescription} varToDiff={varToDiff} />
            }
        </div>
    );
};