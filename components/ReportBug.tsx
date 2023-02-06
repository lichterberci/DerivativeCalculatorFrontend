import React, { useState } from "react";
import { WriteBugReport } from "../scripts/Firebase";
import styles from "../styles/RepurtBug.module.css"

export default function ReportBug (): JSX.Element {

    const [title, setTitle] = useState<string>("");
    const [titleError, setTitleError] = useState<null | string>(null);
    const [description, setDescription] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<null | string>(null);
    const [priority, setPriority] = useState<number>(0);
    const [priorityError, setPriorityError] = useState<null | string>(null);
    const [sendError, setSendError] = useState<null | string>(null);

    const ValidateAndSend = async () => {

        await setSendError(null);

        let isDataValid = true;

        if (priority < 0 || priority > 3) {
            console.error(`Priority is invalid! (${priority})`);
            setDescriptionError(`A prioritás invalid! (${priority})`);
            isDataValid = false;
        }

        if (title.trim() == "") {
            console.error("Title must not be empty!");
            setTitleError("A cím nem lehet üres!");
            isDataValid = false;
        }

        if (title.length > 50) {
            console.error("Title is too long!");
            setTitleError("A cím túl hosszú!");
            isDataValid = false;
        }

        if (description.trim() == "") {
            console.error("Description must not be empty!");
            setDescriptionError("A leírás nem lehet üres!");
            isDataValid = false;
        }

        if (description.length > 140) {
            console.error("Description is too long!");
            setDescriptionError("A leírás túl hosszú!");
            isDataValid = false;
        }

        if (isDataValid == false)
            return;

        const success = await WriteBugReport({
            title: title,
            description: description,
            priority: priority,
            timestamp: Date.now()
        });

        if (success == false) {
            setSendError("Nem tudtuk elküldeni a hibajelentést!");
            return;
        }

        setTitle("");
        setDescription("");
        setPriority(0);
    };

    return (

        <div className={styles.myContainer}>
            
            <div className={styles.repurtBugHolder} >

                <h1 className={styles.title}>Valami hibát találtál?<br></br> Küldd el nekünk!</h1>
                <input 
                    className={styles.titleInput}
                    type="text" 
                    placeholder="Adj egy címet..."
                    value={title}
                    onChange={e => {
                        setTitle(e.target.value);
                        setTitleError(null);
                    }}
                />

                {
                    titleError != null
                    &&
                    <div>
                        { titleError }
                    </div>
                }

                <textarea 
                    className={styles.bugInput}
                    rows={3}
                    placeholder="Írd le a problémát..."
                    value={description}
                    onChange={e => {
                        setDescription(e.target.value);
                        setDescriptionError(null);
                    }}
                />  

                {
                    descriptionError != null
                    &&
                    <div>
                        { descriptionError }
                    </div>
                }

                <select
                    className={styles.dropDown}
                    value={priority}
                    onChange={e => {
                        setPriority(Number.parseInt(e.target.value));
                        setPriorityError(null);
                    }}
                >
                    <option key={0} value={0}>Kellemetlenség</option>
                    <option key={1} value={1}>Időszakos probléma</option>
                    <option key={2} value={2}>Gyakori probléma</option>
                    <option key={3} value={3}>A weboldal működését meggátló probléma</option>
                </select>

                {
                    priorityError != null
                    &&
                    <div>
                        { priorityError }
                    </div>
                }

                <button
                    className={styles.button}
                    onClick={() => ValidateAndSend()}
                >
                    Send
                </button>

                {
                    sendError != null
                    &&
                    <div>
                        { sendError }
                    </div>
                }
            </div>
        </div>
    );
}