import { MathJaxContext } from "better-react-mathjax";
<<<<<<< HEAD
import {useRef, useState} from "react";
=======
import {useEffect, useRef, useState} from "react";
>>>>>>> 0f875f0d246458565d80df36adacad801d821bf8
import Image from "next/image"

import { ISolutionData } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import Solution from "../components/Solution";
import { DifferentiateInput } from "../scripts/QueryBackend";
import styles from "../styles/calculator.module.css"
import MathJaxConfig from "../mathjax.config.json"
import LoadingAnim from "../public/LoadingAnim.gif"
import Head from "next/head";
<<<<<<< HEAD
=======
import { FirebaseInit } from "../scripts/Firebase";
import { GetPreferences, SetCSSThemeFromLocalStorage } from "../scripts/Preferences";
>>>>>>> 0f875f0d246458565d80df36adacad801d821bf8

let fetchAbortController = new AbortController();
let fetchAbortSignal = fetchAbortController.signal;

export default function CalculatorPage (): JSX.Element {
    
    const inputRef = useRef("");
    const [solutionData, setSolutionData] = useState<ISolutionData | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

<<<<<<< HEAD
=======
    useEffect (() => {
        FirebaseInit();

        SetCSSThemeFromLocalStorage();
    }, []);

>>>>>>> 0f875f0d246458565d80df36adacad801d821bf8
    const QueryDifferentiationAndUpdateUI = async () => {

        if (isLoading) {
            fetchAbortController.abort();
            fetchAbortController = new AbortController();
            fetchAbortSignal = fetchAbortController.signal;
        }

        if (errorText != null)
            await setErrorText(null);

        await setIsLoading(true);

        const data: ISolutionData | IResponseError = await DifferentiateInput(inputRef.current, fetchAbortSignal);

        setIsLoading(false);

        if ("type" in data && "message" in data) { // error

            if (data.type == "ABORT ERROR")
                return;

            setErrorText(`${data.message}`);
            setSolutionData(null);

            return;            
        }

        setSolutionData(data as ISolutionData);
    }

    return (<>

        <Head>
            <title>Ellenőrző oldal</title>
        </Head>
        <main>
            <MathJaxContext version={3} config={MathJaxConfig}>
<<<<<<< HEAD
                <h1 className={styles.title}>
                    <span className={styles.nemHiszed}>Nem hiszed?</span>
                    <span>{" "}</span>
                    <span className={styles.derivative}> Deriváld le!</span>
                </h1>
                <div className={styles.myContainer}>
                    <span className={styles.inputHolder}>
                        <input 
                            className={styles.input}
                            type="text" 
                            placeholder="sin(x)" 
                            onChange={e => inputRef.current = e.target.value}
                            onKeyDown={e => {
                                if (e.key == "Enter")
                                    QueryDifferentiationAndUpdateUI()
                            }}
                        />

                        <button className={styles.button} onClick={QueryDifferentiationAndUpdateUI}>
                            Differentiate
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
                            return <Image alt="Loading animation" src={LoadingAnim} width={100} height={100}/>
                        }
                        })()
                    }
=======
                <div className={styles.myContainer}>
                    <div style={{marginTop:100}}>
                        <h1 className={styles.title}>
                            <span className={styles.nemHiszed}>Nem hiszed?</span>
                            <span>{" "}</span>
                            <span className={styles.derivative}> Deriváld le!</span>
                        </h1>
                        <span className={styles.inputHolder}>
                            <input 
                                className={styles.input}
                                type="text" 
                                placeholder="sin(x)" 
                                onChange={e => inputRef.current = e.target.value}
                                onKeyDown={e => {
                                    if (e.key == "Enter")
                                        QueryDifferentiationAndUpdateUI()
                                }}
                            />

                            <button className={styles.button} onClick={QueryDifferentiationAndUpdateUI}>
                                Differentiate
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
>>>>>>> 0f875f0d246458565d80df36adacad801d821bf8
                    </div>
                </div>
            </MathJaxContext>
        </main>
    </>);
};