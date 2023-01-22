import Head from 'next/head'
import { useEffect, useState } from 'react';
import { GetPreferences, SetPreferences } from '../scripts/Preferences';

export default function Home() {

	const [darkMode, setDarkMode] = useState<boolean>(false);

	useEffect (() => {

		setDarkMode(GetPreferences("darkMode"));

	}, [])


	return (<>
		<Head>
			<title>Deriváló segéd</title>
			<meta name="description" content="Egy oldal a deriválás gyakorlására. Elsősorban a BME diákjainak fejlesztve." />
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="icon" href="/favicon.ico" />
		</Head>
		<main style={{backgroundColor: darkMode ? "black" : "white", color: darkMode ? "white" : "black"}}>
			<input
				type={"checkbox"}
				checked={darkMode}
				onChange={e => {
					SetPreferences({"darkMode": e.target.checked});
					setDarkMode(e.target.checked);
				}}
			/>
			Darkmode
		</main>
	</>);
}
	