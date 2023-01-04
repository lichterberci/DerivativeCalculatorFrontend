import { MathJaxContext } from "better-react-mathjax";
import {useRef, useState} from "react";
import { ISolutionData } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import Solution from "../components/Solution";
import { DifferentiateInput } from "../scripts/QueryBackend";
import styles from "../styles/CalculatorPage.module.css"
import MathJaxConfig from "../mathjax.config.json"

let fetchAbortController = new AbortController();
let fetchAbortSignal = fetchAbortController.signal;

export default function CalculatorPage (): JSX.Element {
    
    const inputRef = useRef("");
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

        <MathJaxContext version={3} config={MathJaxConfig}>
            <h1 className={styles.title}>Nem hiszed?<span className={styles.derivative}> Deriváld le!</span></h1>
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
                    solutionData != null && isLoading == false
                    &&
                    <Solution data={solutionData}/>
                }
                </div>
            </div>
        </MathJaxContext>
    </>);
};