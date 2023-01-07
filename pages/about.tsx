
import styles from "../styles/about.module.css"

export default function About (): JSX.Element {
    
    return (
    <div className={styles.aboutContainer}>
        <h1 className={styles.ourTeam}>Csapatunk</h1>
        <div className={styles.teamList}>
            <div>
                <div className={styles.name}>
                    Lichter Bertalan
                </div>
                <div className={styles.responsibilityList}>
                    <div>Algoritmus dizájn</div>
                    <div>Backend</div>
                </div>
            </div>
            <div>
                <div className={styles.name}>
                    Lipcsey Márton
                </div>
                <div className={styles.responsibilityList}>
                    <div>Frontend</div>
                    <div>Dizájn</div>
                </div>
            </div>
            <div>
                <div className={styles.name}>
                    Szabó Gergő
                </div>
                <div className={styles.responsibilityList}>
                    <div>Segéderő / kabala</div>
                </div>
            </div>
        </div>
    </div>);
};