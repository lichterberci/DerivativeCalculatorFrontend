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
        varToDiff: string,
        isLast: boolean
    }
): JSX.Element 
{
    
    const { stepAsLatex, stepDescription } = props;
    
    const [isShowingDescription, setIsShowingDescription] = useState<boolean>(false);

    return (
        <div 
            className={[styles.stepHolder, stepDescription != null ? styles.stepHover : ""].join(" ")}
            // onMouseEnter={() => setIsShowingDescription(true)}
            // onMouseLeave={() => setIsShowingDescription(false)}
            onClick={() => setIsShowingDescription(!isShowingDescription)}
        >
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