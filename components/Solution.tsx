import MathJax from "better-react-mathjax/MathJax";
import { SolutionData } from "../classes/ResponseData";
import SolutionStep from "./SolutionStep";

export default function Solution (data: SolutionData | null): JSX.Element {

    if (data == null)
        return <></>

    return (
        <div className="solution-wrapper">
            <div className="input-output-latex">
                <MathJax> 
                    $$ {data.simplifiedInputAsLatex} = {data.outputAsLatex} $$
                </MathJax>
            </div>
            <ul className="step-list">
            {
                data.stepsAsLatex.map((step, i) => 
                    <li key={i}>
                    {
                        SolutionStep(
                            step, 
                            i < data.stepDescriptions.length ? data.stepDescriptions[i] : null
                        )
                    }
                    </li>
                )   
            }
            </ul>
        </div>
    );
}