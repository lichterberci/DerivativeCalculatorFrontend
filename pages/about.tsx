import Head from "next/head";
import styles from "../styles/about.module.css"
import TeamCard from "../components/TeamCard";
import { useRef } from 'react';

export default function About (): JSX.Element {

    const team = [
        {
            name:"Lichter Bertalan",
            role: ["algoritmus dizájn", "backend"],
            url:"lichterbertalan.jpg",
            colors: 
                {
                    primary:"#8e2de2",
                    secondary:"#4a00e0"
                }
            ,
        },
        {
            name:"Lipcsey Márton",
            role: ["frontend", "dizájn"],
            url:"lipcseymárton.jpg",
            colors: 
                {
                    primary:"#4568DC",
                    secondary:"#B06AB3"
                }
            ,
        },
        {
            name:"Szabó Gergő",
            role: ["segítő"],
            url:"szabógergő.jpg",
            colors: 
                {
                    primary:"#9D50BB",
                    secondary:"#6E48AA"
                }
            ,
        },
    ]

    return (<>
        <Head>
            <title>Rólunk</title>
        </Head>
        <main>
            <div className={styles.myContainer}>
                <div className={styles.teamHolder}>
                    {
                        team.map((member,k)=>{
                            return(
                                <TeamCard props={member} key={k}/>
                            )
                        })
                    }
                </div>
            </div>
        </main>        
    </>);
};