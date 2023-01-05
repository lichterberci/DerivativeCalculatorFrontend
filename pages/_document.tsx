import { MathJaxContext } from 'better-react-mathjax'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';
import Navbar, {INavbarItemData} from "../components/Navbar"

import MathJaxConfig from "../mathjax.config.json"

const navBarItems: INavbarItemData[] = [
	{
		href: "/",
		name: "Kezdőlap"
	},
	{
		href: "/CalculatorPage",
		name: "Ellenőrzés"
	},
	{
		href: "/ExercisePage",
		name: "Gyakorlás"
	}
];

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body style={{width: "100%", height: "100%"}}>
				<Navbar items={navBarItems} />
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
