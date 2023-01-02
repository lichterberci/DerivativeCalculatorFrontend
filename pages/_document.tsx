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
		name: "Kurva, ez ennyi"
	},
	{
		href: "/ExercisePage",
		name: "Gyakorlás"
	}
];

export default function Document() {
	return (
		<Html lang="en">
			<Head>
				<Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_KEY}`}/>
				<Script strategy="lazyOnload" id="googleScript">
					{`
						window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());
	
						gtag('config', '${process.env.GTAG_KEY}');
					`}
				</Script>
			</Head>
			<body>
				<Navbar items={navBarItems} />
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
