import Head from 'next/head'
import { useEffect, useState } from 'react';
import { FirebaseInit, WriteBugReport } from '../scripts/Firebase';
import { GetPreferences, SetCSSThemeFromLocalStorage, SetPreferences } from '../scripts/Preferences';
import ReportBug from "../components/ReportBug"

export default function Home() {

	useEffect (() => {

		FirebaseInit();

		SetCSSThemeFromLocalStorage();

	}, [])


	return (<>
		<Head>
			<title>Deriváló segéd</title>
			<meta name="description" content="Egy oldal a deriválás gyakorlására. Elsősorban a BME diákjainak fejlesztve." />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main>

			<div style={{color: "red", textAlign: "center", margin: "auto"}}>A weboldal fejlesztés alatt áll!</div>

			<ReportBug />
		</main>
	</>);
}
	