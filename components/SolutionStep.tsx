import MathJax from "better-react-mathjax/MathJax/MathJax";
import { useEffect, useState } from "react";
import { IStepDescription } from "../classes/StepDescription";
import StepDescription from "./StepDescription";
import styles from "../styles/SolutionStep.module.css";

export default function SolutionStep (
    props: { 
        stepAsLatex: string, 
        stepDescription: IStepDescription | null, 
        varToDiff: string,
        isLast: boolean
    }
): JSX.Element 
{
    
    const { stepAsLatex, stepDescription, varToDiff, isLast } = props;
    
    const [isShowingDescription, setIsShowingDescription] = useState<boolean>(false);

    // whenever the data changes, we close the step
    useEffect(() => {

      setIsShowingDescription(false);

    }, [props])

    return (
        <div 
            className={[styles.stepHolder, stepDescription != null ? styles.stepHover : ""].join(" ")}
            onClick={() => setIsShowingDescription(!isShowingDescription)}
        >
            <div className={styles.stepLatex}>
                <MathJax  
                    className={[styles.stepMathJax, isLast ? styles.stepMathJaxLast : "" ].join(" ")}
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