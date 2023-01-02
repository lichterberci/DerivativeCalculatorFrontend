import type { AppProps } from 'next/app'
import Script from 'next/script'

export default function App({ Component, pageProps }: AppProps) {
  return (<>
    <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${process.env.GTAG_KEY}`}/>
    <Script strategy="lazyOnload" id="googleScript">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', '${process.env.GTAG_KEY}');
      `}
    </Script>
    <Component {...pageProps} />
  </>)
  
}
