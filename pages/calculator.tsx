import { MathJaxContext } from "better-react-mathjax";
import { useEffect, useRef, useState } from "react";
import Image from "next/image"

import { ISolutionData } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import Solution from "../components/Solution";
import { DifferentiateInput } from "../scripts/QueryBackend";
import styles from "../styles/calculator.module.css"
import MathJaxConfig from "../mathjax.config.json"
import LoadingAnim from "../public/LoadingAnim.gif"
import Head from "next/head";
import { GetPreferences, SetPreferences } from "../scripts/Preferences";

let fetchAbortController = new AbortController();
let fetchAbortSignal = fetchAbortController.signal;

export default function CalculatorPage (): JSX.Element {
    
    const [inputText, setInputText] = useState<string>("sin(x)^2");
    const [solutionData, setSolutionData] = useState<ISolutionData | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const QueryDifferentiationAndUpdateUI = async () => {

        if (isLoading) {
            fetchAbortController.abort();
            fetchAbortController = new AbortController();
            fetchAbortSignal = fetchAbortController.signal;
        }

        if (errorText != null)
            await setErrorText(null);

        await setIsLoading(true);
        
        const result: ISolutionData | IResponseError = await DifferentiateInput(inputText, fetchAbortSignal);
        
        setIsLoading(false);
        
        if ("type" in result && "message" in result) { // error
            
            if (result.type == "ABORT ERROR")
                return;

            setSolutionData(null);
                
            const errorTypesToDisplay = ["PARSING ERROR", "EVALUATION ERROR"];

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

        setSolutionData(result as ISolutionData);

        SetPreferences({
            "CalculatorSolutionData": result
        });
    }

    useEffect (() => {

        setSolutionData(GetPreferences("CalculatorSolutionData") ?? null);

        setInputText(GetPreferences("CalculatorInput") ?? "");       

    }, []);

    return (<>

        <Head>
            <title>Kalkulátor</title>
            <meta name="description" content="Szeretnéd magad ellenőrizni? Hiányos a megoldókulcs? Lépésről lépésre végigvezetünk tetszőleges problémákon!" />
        </Head>
        <main className={styles.main}>
            <MathJaxContext version={3} config={MathJaxConfig}>
                <div className={styles.myContainer}>
                    <div style={{marginTop:100}}>
                        <h1 className={styles.title}>
                            <span className={styles.nemHiszed}>Nem hiszed?</span>
                            <span>{" "}</span>
                            <span className={styles.derivative}> Deriváld le!</span>
                        </h1>
                        <span className={styles.inputHolder}>
                            
                            <div style={{display:"flex", flexDirection:"row", gap:"1rem", alignItems:"center"}}>
                                <input 
                                    className={styles.input}
                                    type="text" 
                                    placeholder="sin(x)^2" 
                                    autoComplete="false"
                                    aria-autocomplete="none"
                                    value={inputText}
                                    onChange={e => {
                                        setInputText(e.target.value);

                                        SetPreferences({
                                            "CalculatorInput": e.target.value
                                        });
                                    }}
                                    onKeyDown={e => {
                                        if (e.key == "Enter")
                                            QueryDifferentiationAndUpdateUI()
                                    }}
                                    tabIndex={1}
                                />
                                <Image  onClick={() => setInputText("")} className={ GetPreferences("UIPreferences")?.darkMode == true ? styles.darkClear : styles.clear } src="/images/x-white.webp" alt="x" width={20} height={20} />
                            </div>


                            <button 
                                className={styles.button} 
                                onClick={QueryDifferentiationAndUpdateUI}
                                tabIndex={1}
                            >
                                Differenciálás
                            </button>
                        </span>

                        <div>
                            {
                                errorText != null
                                && 
                                <div className={styles.errorText}>
                                    { errorText }
                                </div>
                            }
                        </div>

                        <div className={styles.solutionWrapper}>
                        {
                            (() => {
                                if (isLoading == false) {
                                    if (solutionData != null)
                                        return <Solution data={solutionData}/>
                                    else // error message is displayed, so we don't have to do anything here
                                        return <></>
                                } 
                                else { // display loading anim
                                    return <Image className={styles.loading} alt="Loading animation" src={LoadingAnim} width={600} height={300}/>
                            }
                            })()
                        }
                        </div>
                    </div>
                </div>
            </MathJaxContext>
        </main>
    </>);
};