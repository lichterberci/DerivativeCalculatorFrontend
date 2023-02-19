import Head from 'next/head'
import ReportBug from "../components/ReportBug"
import styles from "../styles/index.module.css"
import Image from 'next/image';
import Faq from "react-faq-component";
import FAQQuestions from "../FAQ.json"
import Link from 'next/link';

export default function Home() {

	const data = {
		title: "",
		rows: FAQQuestions.map(QA => ({
			title: QA?.question ?? "",
			content: QA?.answer ?? ""
		}))
	};
	
	const faqStyles = {
		titleTextColor: "black",
		rowTitleTextSize:"20px",
		rowContentTextSize: "18px",
		rowTitleColor: "black",
		rowContentColor: '#434343',
		backgroundColor:"blue",
	};
	
	const config = {
		// animate: true,
		// arrowIcon: "V",
		// tabFocus: true
	};

	return (<>
		<Head>
			<title>Deriváljunk!</title>
			<meta name="description" content="Nem megy a deriválás? Oldalunkon tudsz gyakorolni, ami a legjobb módja a készségszintű elsajátításához! Elsősorban a BME hallgatóinak van fejlesztve, de akárki használhatja." />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main>
			<div className = {styles.navbarOffset} />
			<section className={styles.hero}>
				<div className={styles.myContainer}>

					<h1 className={styles.title}>A deriválás kicsit meredek?</h1>
					<h2 className={styles.title2}>Nekünk is <span className={styles.xd}>XD</span></h2>

					<div className={styles.buttonWrapper}>
						<Link className={styles.button} href="/calculator" >Kalkulátor</Link>
						<Link className={styles.button} href="/exercise" >Gyakorlás</Link>
					</div>
				
				</div>
			</section>
			<svg className={styles.svg}  id="svg" viewBox="0 0 1440 251" xmlns="http://www.w3.org/2000/svg" ><defs><linearGradient id="gradient" x1="78%" y1="91%" x2="22%" y2="9%"><stop offset="5%" stop-color="#8e10ef"></stop><stop offset="100%" stop-color="#8e10ef"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,100 0,100 C 160.2666666666667,115.60000000000001 320.5333333333334,131.20000000000002 461,135 C 601.4666666666666,138.79999999999998 722.1333333333332,130.79999999999998 882,123 C 1041.8666666666668,115.20000000000002 1240.9333333333334,107.60000000000001 1440,100 C 1440,100 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.4" ></path><defs><linearGradient id="gradient" x1="78%" y1="91%" x2="22%" y2="9%"><stop offset="5%" stop-color="#8e10ef"></stop><stop offset="95%" stop-color="#8e10ef"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,200 0,200 C 167.33333333333331,189.2 334.66666666666663,178.4 514,175 C 693.3333333333334,171.6 884.6666666666667,175.60000000000002 1041,181 C 1197.3333333333333,186.39999999999998 1318.6666666666665,193.2 1440,200 C 1440,200 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="0.53" ></path><defs><linearGradient id="gradient" x1="78%" y1="91%" x2="22%" y2="9%"><stop offset="5%" stop-color="#8e10ef"></stop><stop offset="95%" stop-color="#8e10ef"></stop></linearGradient></defs><path d="M 0,400 C 0,400 0,300 0,300 C 163.86666666666667,310.4 327.73333333333335,320.8 490,326 C 652.2666666666667,331.2 812.9333333333334,331.20000000000005 971,326 C 1129.0666666666666,320.79999999999995 1284.5333333333333,310.4 1440,300 C 1440,300 1440,400 1440,400 Z" stroke="none" stroke-width="0" fill="url(#gradient)" fill-opacity="1" ></path>
			</svg>

			<section className={styles.cta}>
				<div className={styles.ctaWrapper}>
					<div className={styles.sphere}></div>
					<Image className={styles.arrow} src={"/images/arrow.svg"} width={5} height={5} alt={"arrow"}/>

					<div className={styles.ctaElement}>
						<p className={styles.ctaTitle}>Konkrét feladatod van, aminek szeretnéd tudni a megoldását? <br /> Hiányos, vagy rossz egy megoldókulcs? <br /> Integrálsz, és szeretnéd visszaellenőrizni magad?</p>
						<Link className={styles.ctaButton} href="/calculator" >Nézd meg a megoldást!</Link>
					</div>

					<div className={styles.ctaElement}>
						<p className={styles.ctaTitle}>Nem érzed biztosnak magad a deriválás terén? <br /> Közeleg egy ZH, és szeretnél felpörögni? <br /> Régen tanultad, és szeretnéd tudni, hogyan megy?</p>
						<Link className={styles.ctaButton} href="/exercise" >Próbáld ki magad!</Link>
					</div>

				</div>
			</section>	

			<section className={styles.faq}>
				<div className={styles.myContainer}>
					<h1 className={styles.faqTitle}>GYIK</h1>
					<div className={styles.faqStyleWrapper}>
						<Faq
							styles={faqStyles}
							data={data}
							config={config}
						/>
					</div>

				</div>
			</section>
			
			<section className={styles.aboutUsContainer}>
				<Link href="/about" className={styles.aboutUsTitle}>Kik vagyunk?</Link>
			</section>
		</main>
	</>);
}
	