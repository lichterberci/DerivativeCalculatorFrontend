import { MathJax, MathJaxContext } from "better-react-mathjax";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Image from "next/image"

import DifficultyLevel from "../classes/DifficultyLevel";
import { ISolutionData } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import Solution from "../components/Solution";
import { GenerateExercise } from "../scripts/QueryBackend";
import MathJaxConfig from "../mathjax.config.json"
import LoadingAnim from "../public/LoadingAnim.gif"
import Head from "next/head";

import styles from "../styles/exercise.module.css"
import { GetPreferences, SetPreferences } from "../scripts/Preferences";

let fetchAbortController = new AbortController();
let fetchAbortSignal = fetchAbortController.signal;

export default function ExercisePage (): JSX.Element {

    const [showSolution, setShowSolution] = useState<boolean>(false);
    const [solutionData, setSolutionData] = useState<ISolutionData | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedLevel, setSelectedLevel] = useState<DifficultyLevel>("MEDIUM");

    const GenerateExerciseAndUpdateUI = async () => {

        if (isLoading) {
            fetchAbortController.abort();
            fetchAbortController = new AbortController();
            fetchAbortSignal = fetchAbortController.signal;
        }

        if (errorText != null)
            await setErrorText(null);

        await setIsLoading(true);

        const level = selectedLevel;

        const result: ISolutionData | IResponseError = await GenerateExercise(level, fetchAbortSignal);

        setIsLoading(false);

        if ("type" in result && "message" in result) { // error
            
            if (result.type == "ABORT ERROR")
                return;

            setSolutionData(null);
                
            const errorTypesToDisplay = ["PARSING ERROR", "EVALUATION ERROR"];;

            const translationTable: { [key: string]: string } = {
                "PARSING ERROR": "Sikertelen beolvasás!",
                "UNKNOWN ERROR": "Ismeretlen hiba!",
                "SIMPLIFICATION ERROR": "Egyszerűsítési hiba!",
                "DIFFERENTIATION ERROR": "Deriválási hiba!",
                "EVALUATION ERROR": "Kiértékelési hiba!",
                "FETCH ERROR": "A szerver nem érhető el!",
                "EXERCISE GENERATION ERROR": "Feladat generálási hiba!"
            };

            const prettyErrorType = result.type.charAt(0) + result.type.slice(1).toLocaleLowerCase(["hu", "en"]) + "!";

            if (errorTypesToDisplay.includes(result.type)) {
                setErrorText(`${result.message}`);
                return;
            }
            
            if (Object.hasOwn(translationTable, result.type)) {
                setErrorText(translationTable[result.type]);
                return;
            }
            
            setErrorText(`${prettyErrorType}`);                

            return;
        }

        await setShowSolution(false);

        setSolutionData(result as ISolutionData);

        SetPreferences({
            "ExerciseSolutionData": result
        });
    };

    useEffect(() => {

        setSolutionData(GetPreferences("ExerciseSolutionData") as ISolutionData ?? null);
        setSelectedLevel(GetPreferences("SelectedLevel") as DifficultyLevel ?? "MEDIUM");

    }, []); 

    return (<>

        <Head>
            <title>Gyakoroljunk!</title>
            <meta name="description" content="Közeleg a ZH? Szeretnéd újra felvenni a tempót? Feladatainkkal tudsz gyakorolni, és amennyiben más jött ki, megnézheted hol, mit rontottál el!" />
        </Head>
        <main>
            <MathJaxContext version={3} config={MathJaxConfig}>

            <div className={styles.myContainer}>
                
                <h1 className={styles.title}>
                    Gyakorold a deriválást! <br/> <span className={styles.textBackground}>Rád fér...</span>
                </h1>

                <div className={styles.inputHolder}>
                    <select
                        className={styles.select}
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
                            
                            setSelectedLevel(e.target.value as DifficultyLevel);

                            SetPreferences({
                                "SelectedLevel": e.target.value
                            });
                        }}
                        tabIndex={1}
                        value={selectedLevel}
                    >
                        <option key={"EASY"} value={"EASY"} className={styles.option}>
                            Könnyű
                        </option>
                        <option key={"MEDIUM"} value={"MEDIUM"} className={styles.option}>
                            Közepes
                        </option>
                        <option key={"HARD"} value={"HARD"} className={styles.option}>
                            Nehéz
                        </option>
                        <option key={"HARDCORE"} value={"HARDCORE"} className={styles.option}>
                            6-os ZH
                        </option>
                    </select>

                    <button 
                        className={styles.button} 
                        onClick={GenerateExerciseAndUpdateUI}
                        tabIndex={2}
                    >
                        Feladat generálása
                    </button>
                </div>

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
                    <div className={styles.solutionHolder}>

                        <div>
                            <MathJax className={styles.exercise} dynamic>
                                { `$$ ${solutionData?.inputAsLatex} = ? $$` }
                            </MathJax>
                        </div>

                        <button 
                            className={styles.button} 
                            onClick={() => setShowSolution(true)}
                            tabIndex={3}
                        >
                            Megoldás mutatása
                        </button>
                    </div>
                }   

                <div className={styles.solutionWrapper}>
                    {
                        (() => {
                            if (isLoading == false) {
                                if (solutionData != null && showSolution)
                                return <Solution data={solutionData}/>
                                else // error message is displayed, so we don't have to do anything here
                                return <></>
                            } 
                            else { // display loading anim
                                return <Image className={styles.loading}  alt="Loading animation" src={LoadingAnim} width={600} height={300}/>
                            }
                        })()
                    }
                </div>
            </div>

            </MathJaxContext>
        </main>
    </>);
}