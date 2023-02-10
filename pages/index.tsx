import Head from 'next/head'
import { useEffect, useState } from 'react';
import { FirebaseInit, WriteBugReport } from '../scripts/Firebase';
import { GetPreferences, SetCSSThemeFromLocalStorage, SetPreferences } from '../scripts/Preferences';
import ReportBug from "../components/ReportBug"

export default function Home() {

	return (<>
		<Head>
			<title>Deriváló segéd</title>
			<meta name="description" content="Egy oldal a deriválás gyakorlására. Elsősorban a BME diákjainak fejlesztve." />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main>

			<ReportBug />
			<div style={{color: "red", textAlign: "center", margin: "auto", marginTop: "10px"}}>A weboldal fejlesztés alatt áll!</div>

		</main>
	</>);
}
	