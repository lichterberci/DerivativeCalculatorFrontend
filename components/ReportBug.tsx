import React, { useCallback, useEffect, useState } from "react";
import { WriteBugReport } from "../scripts/Firebase";
import styles from "../styles/RepurtBug.module.css"
import Modal from 'react-modal';
import Image from 'next/image'

export default function ReportBug (): JSX.Element {

    const [title, setTitle] = useState<string>("");
    const [titleError, setTitleError] = useState<null | string>(null);
    const [description, setDescription] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<null | string>(null);
    const [priority, setPriority] = useState<number>(0);
    const [priorityError, setPriorityError] = useState<null | string>(null);
    const [sendError, setSendError] = useState<null | string>(null);
    const [isOpen, setIsOpen] = useState<boolean>(false);

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

        setIsOpen(!isOpen);

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

    const KEY_NAME_ESC = 'Escape';
    const KEY_EVENT_TYPE = 'keyup';

    function useEscapeKey() {
        const handleEscKey = useCallback(( event:any ) => {
            if ( event.key === KEY_NAME_ESC ) {
                setIsOpen(false);
            }
        }, []);

        useEffect(() => {
            document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);
        
            return () => {
              document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
            };
          }, [handleEscKey]);

    }

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflowY = 'hidden'
        } else {
            document.body.style.overflowY = 'auto'
        }
    }, [isOpen])

    useEscapeKey();

    return (
        
        <div>

            <Image onClick={() => setIsOpen(!isOpen)} className={styles.bugButton} src="/images/reportbug.png" width={40} height={40} alt={"bug report"} />

            <Modal
                className={styles.modal}
                isOpen={isOpen}
                overlayClassName={styles.overlay}
            >
                <div className={styles.reportBugHolder} >

                   <Image onClick={() => setIsOpen(!isOpen)} className={styles.closingX} src="/images/closing_X.png" width={25} height={25} alt={"closingx"} />
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
                        <div className={styles.error}>
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
                        <div className={styles.error}>
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
                        <div className={styles.error}>
                            { priorityError }
                        </div>
                    }

                    <button
                        className={styles.button}
                        onClick={() => 
                            {
                                ValidateAndSend()
                            }
                        }
                    >
                        Küldés
                    </button>

                    {
                        sendError != null
                        &&
                        <div className={styles.error}>
                            { sendError }
                        </div>
                    }
                </div>
            </Modal>
            

        </div>

    );
}