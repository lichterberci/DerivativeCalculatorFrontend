import { useRef, useState } from "react";
import { SolutionData } from "../classes/ResponseData";
import Solution from "../components/Solution";
import { DifferentiateInput } from "../scripts/DifferentiateInput";


export default function CalculatorPage () {

    const inputRef = useRef("");
    const [solutionData, setSolutionData] = useState<SolutionData | null>(null);
    const [errorText, setErrorText] = useState<string | null>(null);

    const QueryDifferentiationAndUpdateUI = async () => {
        setErrorText(null);

        try {
            const data = await DifferentiateInput(inputRef.current);
            
            setSolutionData(data);
        } catch (e: any) {
            setErrorText(e.message);
            setSolutionData(null);
        }
    }

    return (<>

        <span>
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

        <div className="error-text-wrapper">
            {
            (() => {
                if (errorText == null)                
                    return <></>

                return (<div className="error-text">
                    { errorText }
                </div>)
            })()
            }
        </div>

        <div className="solution-wrapper">
            {
                Solution(solutionData)
            }
        </div>

    </>);
};