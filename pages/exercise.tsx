import { MathJax, MathJaxContext } from "better-react-mathjax";
import { ChangeEvent, useRef, useState } from "react";
import Image from "next/image"

import DifficultyLevel from "../classes/DifficultyLevel";
import { ISolutionData } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import Solution from "../components/Solution";
import { GenerateExercise } from "../scripts/QueryBackend";
import MathJaxConfig from "../mathjax.config.json"
import LoadingAnim from "../public/LoadingAnim.gif"
import Head from "next/head";

let fetchAbortController = new AbortController();
let fetchAbortSignal = fetchAbortController.signal;

export default function ExercisePage (): JSX.Element {

    const [showSolution, setShowSolution] = useState<boolean>(false);
    const [solutionData, setSolutionData] = useState<ISolutionData | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const selectedLevel = useRef<DifficultyLevel>("MEDIUM");

    const GenerateExerciseAndUpdateUI = async () => {

        if (isLoading) {
            fetchAbortController.abort();
            fetchAbortController = new AbortController();
            fetchAbortSignal = fetchAbortController.signal;
        }

        if (errorText != null)
            await setErrorText(null);

        await setIsLoading(true);

        const level = selectedLevel.current;

        const result: ISolutionData | IResponseError = await GenerateExercise(level, fetchAbortSignal);

        setIsLoading(false);

        if ("type" in result && "message" in result) { // error

            if (result.type == "ABORT ERROR")
                return;

            setErrorText(result.message);
            setSolutionData(null);
            return;
        }

        await setShowSolution(false);
        setSolutionData(result);
    };

    return (<>

        <Head>
            <title>Gyakorló oldal</title>
        </Head>
        <main>
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
                    showSolution == false && solutionData != null && isLoading == false
                    &&
                    <div>
                        <MathJax dynamic>
                            { `$$ ${solutionData?.inputAsLatex} = ? $$` }
                        </MathJax>
                        <button onClick={() => setShowSolution(true)}>Megoldás mutatása</button>
                    </div>
                }   
                {
                    (() => {
                        if (isLoading == false) {
                            if (solutionData != null && showSolution)
                                return <Solution data={solutionData}/>
                            else // error message is displayed, so we don't have to do anything here
                                return <></>
                        } 
                        else { // display loading anim
                            return <Image alt="Loading animation" src={LoadingAnim} width={600} height={300}/>
                        }
                    })()
                }
            </MathJaxContext>
        </main>
    </>);
}