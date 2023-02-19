import { MathJaxContext } from 'better-react-mathjax'
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang="hu" style={{ backgroundColor: "var(--background-color)", color: "var(--text-color"}}>
			<Head>
				<link rel="preconnect" href="https://fonts.googleapis.com" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
				<link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap" rel="stylesheet" />
			</Head>
			<body style={{width: "100%", height: "100%", margin: 0}}>
				{/* <Navbar items={navBarItems} /> */}
				
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
