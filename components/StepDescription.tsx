import { MathJax } from "better-react-mathjax";
import { IStepDescription } from "../classes/StepDescription";
import styles from "../styles/StepDescription.module.css"

export default function StepDescription (props: { stepDescription: IStepDescription | null, varToDiff: string }): JSX.Element {

    const { stepDescription, varToDiff } = props;

    if (stepDescription === null) {
        return (<></>);
    }

    return (
        <div className={styles.descriptionWrapper}>
            <div className="step-description-rule">
                <MathJax dynamic inline>
                    { `Szabály: \\( ${ stepDescription.ruleNameAsLatex } \\)` }
                </MathJax>
            </div>
            <div className={styles.fxAndGx}>
                
                <MathJax dynamic inline>
                    { ` Behelyettesítés: \\( f\\left(${varToDiff}\\right) = ${ stepDescription.fxAsLatex } \\) ${(
                        stepDescription.gxAsLatex != null ? ` és \\( g\\left(${varToDiff}\\right) = ${ stepDescription.gxAsLatex } \\)` : ""
                    )}` }
                </MathJax>
            </div>
        </div>
    );
}