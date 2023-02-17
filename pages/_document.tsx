import { MathJaxContext } from 'better-react-mathjax'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="hu" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color"}}>
			<Head />
			<body style={{width: "100%", height: "100%", margin: 0}}>
				{/* <Navbar items={navBarItems} /> */}
				
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
