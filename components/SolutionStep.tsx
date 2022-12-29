import MathJax from "better-react-mathjax/MathJax/MathJax";
import type { StepDescription } from "../classes/StepDescription";

function StepDescription (stepDescription: StepDescription | null): JSX.Element {

    console.log(stepDescription);

    if (stepDescription === null) {
        return (<></>);
    }

    return (
        <div className="step-description">
            <div className="step-description-rule">
                <MathJax>
                    $$ { stepDescription.ruleNameAsLatex } $$
                </MathJax>
            </div>
            <div className="step-description-fx">
                <MathJax>
                    $$ f\left(x\right) = { stepDescription.fxAsLatex } $$
                </MathJax>
            </div>
            <>
            {
                (() => {
                if (stepDescription.gxAsLatex != null) {
                    <div className="step-description-gx">
                        <MathJax>
                            $$ g\left(x\right) = { stepDescription.gxAsLatex } $$
                        </MathJax>
                    </div>
                }
                })()
            }
            </>
        </div>
    );
}

export default function SolutionStep (stepAsLatex: string, stepDescription: StepDescription | null): JSX.Element {
    return (
        <div className="step-holder">
            <div className="step-latex">
                <MathJax>
                    $$ {stepAsLatex} $$
                </MathJax>
            </div>
            {
                StepDescription(stepDescription)
            }
        </div>
    );
};