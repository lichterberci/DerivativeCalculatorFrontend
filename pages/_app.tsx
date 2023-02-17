import type { AppProps } from 'next/app'
import { useRouter } from 'next/router';
import Script from 'next/script'
import { useEffect } from 'react';
import HamburgerMenu from '../components/HamburgerMenu';
import { GoogleLogPage } from '../scripts/GoogleAnalytics';
import { Roboto, Inter } from "@next/font/google"
import { FirebaseInit } from '../scripts/Firebase';
import { SetCSSThemeFromLocalStorage } from '../scripts/Preferences';
import ReportBug from '../components/ReportBug';
import "../styles/FAQ.css"


const roboto = Roboto({
    weight: '400',
    subsets: ['latin'],
});  

export default function App({ Component, pageProps }: AppProps) {
    
    const router = useRouter();
    
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            GoogleLogPage(url);
        }

        router.events.on("routeChangeStart", handleRouteChange);

        return () => {
            router.events.off('routeChangeStart', handleRouteChange)
        }
    }, [router.events])

    const navBarItems = [
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
    
    useEffect (() => {

		FirebaseInit();

		SetCSSThemeFromLocalStorage();

	}, [])

    return (<>
        <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_KEY}`} />
        
        <Script strategy="lazyOnload" id="gtagScript">
        {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.GTAG_KEY}', {
            page_path: window.location.pathname,
        });
        `}
        </Script>

        <main className={roboto.className}>
            <HamburgerMenu items={navBarItems}/>
            <ReportBug/>
            <Component {...pageProps} />
        </main>
    </>)
        
}
    