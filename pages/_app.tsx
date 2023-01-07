import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
    
    const router = useRouter();
    
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            GoogleLogPage(url);
        }

        router.events.on("routeChangeComplete", handleRouteChange);

        return () => {
            router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [router.events])
    
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

    <Component {...pageProps} />
</>)
  
}
