import { MathJax, MathJaxContext } from "better-react-mathjax";
import { ChangeEvent, DetailedHTMLProps, SelectHTMLAttributes, useRef, useState } from "react";
import DifficultyLevel from "../classes/DifficultyLevel";
import { ISolutionData } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import Solution from "../components/Solution";
import { GenerateExercise } from "../scripts/QueryBackend";
import MathJaxConfig from "../mathjax.config.json"

export default function ExercisePage (): JSX.Element {

    const [showSolution, setShowSolution] = useState<boolean>(false);
    const [solutionData, setSolutionData] = useState<ISolutionData | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);

    const selectedLevel = useRef<DifficultyLevel>("MEDIUM");

    const GenerateExerciseAndUpdateUI = async () => {

        if (errorText != null)
            await setErrorText(null);

        const level = selectedLevel.current;

        const result: ISolutionData | IResponseError = await GenerateExercise(level);

        if ("type" in result && "message" in result) { // error
            setErrorText(result.message);
            setSolutionData(null);
            return;
        }

        await setShowSolution(false);
        setSolutionData(result);
    };

    return (<>

        <MathJaxContext version={3} config={MathJaxConfig}>
            <select
                defaultValue={"MEDIUM"}
                onChange={(e: ChangeEvent<HTMLSelectElement>) => selectedLevel.current = e.target.value as DifficultyLevel}
            >
                <option key={"EASY"} value={"EASY"}>
                    Triviális
                </option>
                <option key={"MEDIUM"} value={"MEDIUM"}>
                    Óbudai
                </option>
                <option key={"HARD"} value={"HARD"}>
                    BME
                </option>
                <option key={"HARDCORE"} value={"HARDCORE"}>
                    Tasnádi
                </option>
            </select>

            <button onClick={GenerateExerciseAndUpdateUI}>Generate exercise</button>

            <div>
                {
                    errorText != null
                    && 
                    <div>
                        { errorText }
                    </div>
                }
            </div>
            {
                showSolution == false && solutionData != null
                &&
                <div>
                    <MathJax dynamic>
                        { `$$ ${solutionData?.inputAsLatex} = ? $$` }
                    </MathJax>
                    <button onClick={() => setShowSolution(true)}>Megoldás mutatása</button>
                </div>
            }   
            {
                showSolution
                &&
                <div className="solution-wrapper">
                    <Solution data={solutionData}/>
                </div>
            }
        </MathJaxContext>
    </>);
}