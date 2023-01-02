import { setLazyProp } from "next/dist/server/api-utils";
import {useRef, useState} from "react";
import { ISolutionData } from "../classes/ResponseData";
import IResponseError from "../classes/ResponseError";
import Solution from "../components/Solution";
import { DifferentiateInput } from "../scripts/QueryBackend";
import styles from "../styles/calculatorPage.module.css"

export default function CalculatorPage (): JSX.Element {

    const inputRef = useRef("");
    const [solutionData, setSolutionData] = useState<ISolutionData | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);

    const QueryDifferentiationAndUpdateUI = async () => {

        if (errorText != null)
            await setErrorText(null);

        const data: ISolutionData | IResponseError = await DifferentiateInput(inputRef.current);
        
        if ("type" in data && "message" in data) { // error

            setErrorText(`${data.message}`);
            setSolutionData(null);

            return;            
        }

        setSolutionData(data as ISolutionData);
    }

    return (<>

        <div className={styles.myContainer}>
            <span className={styles.inputHolder}>
                <input 
                    type="text" 
                    placeholder="sin(x)" 
                    onChange={e => inputRef.current = e.target.value}
                    onKeyDown={e => {
                        if (e.key == "Enter")
                            QueryDifferentiationAndUpdateUI()
                    }}
                />

                <button onClick={QueryDifferentiationAndUpdateUI}>
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

            <div className="solution-wrapper">
                <Solution data={solutionData}/>
            </div>
        </div>

    </>);
};