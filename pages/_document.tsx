import { MathJaxContext } from 'better-react-mathjax'
import { Html, Head, Main, NextScript } from 'next/document'
import Script from 'next/script';
import Navbar, {INavbarItemData} from "../components/Navbar"
import HamburgerMenu from '../components/HamburgerMenu';

import MathJaxConfig from "../mathjax.config.json"

// TODO: instead of text, we should just use icons!!
// ??? will this be ok for PC ???

const navBarItems: INavbarItemData[] = [
	{
		href: "/",
		name: "Kezdőlap"
	},
	{
		href: "/calculator",
		name: "Ellenőrzés"
	},
	{
		href: "/exercise",
		name: "Gyakorlás"
	},
	{
		href: "/about",
		name: "Rólunk"
	},
	{
		href: "/settings",
		name: "Beállítások"
	}
];

export default function Document() {
	return (
		<Html lang="en">
			<Head />
			<body style={{width: "100%", height: "100%", margin: 0}}>
				{/* <Navbar items={navBarItems} /> */}
				<Navbar items={navBarItems}/>
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
