import Head from "next/head";
import styles from "../styles/about.module.css"
import TeamCard from "../components/TeamCard";
import { useEffect } from 'react';
import { FirebaseInit } from "../scripts/Firebase";
import { GetPreferences, SetCSSThemeFromLocalStorage } from "../scripts/Preferences";
import Link from "next/link";

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
            <div className={styles.githubContainer}>
                <div className={styles.githubTextContainer}>
                    <div className={styles.githubText1}>
                        Érdekel a kód?
                    </div>
                    <div className={styles.githubText2}>
                        Nézd meg!
                    </div>
                </div>
                <div className={styles.githubLinkContainer}>
                    <Link 
                        className={styles.githubLink} 
                        href={"https://github.com/lichterberci/DerivativeCalculatorFrontend"}
                        target="_blank"
                    >
                        Frontend
                    </Link>
                    <Link 
                        className={styles.githubLink}
                        href={"https://github.com/lichterberci/DerivativeCalculator"}
                        target="_blank"
                    >
                        Backend
                    </Link>
                </div>
            </div>
        </main>        
    </>);
};