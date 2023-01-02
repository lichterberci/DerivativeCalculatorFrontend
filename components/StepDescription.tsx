import { MathJax } from "better-react-mathjax";
import { IStepDescription } from "../classes/StepDescription";

export default function StepDescription (props: { stepDescription: IStepDescription | null }): JSX.Element {

    const { stepDescription } = props;

    if (stepDescription === null) {
        return (<></>);
    }

    return (
        <div className="step-description">
            <div className="step-description-rule">
                <MathJax dynamic>
                    { `$$ ${ stepDescription.ruleNameAsLatex } $$` }
                </MathJax>
            </div>
            <div className="step-description-fx">
                <MathJax dynamic>
                    { `$$ f\\left(x\\right) = ${ stepDescription.fxAsLatex } $$` }
                </MathJax>
            </div>
            <>
            {
                (() => {
                if (stepDescription.gxAsLatex != null) {
                    <div className="step-description-gx">
                        <MathJax dynamic>
                            { `$$ g\\left(x\\right) = ${ stepDescription.gxAsLatex } $$` }
                        </MathJax>
                    </div>
                }
                })()
            }
            </>
        </div>
    );
}