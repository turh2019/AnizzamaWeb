import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';
import Script from 'next/script'
import { useRouter } from 'next/router'
import {pageview} from '../lib/gtm'

function MyApp({ Component, pageProps }) {

  const router = useRouter()
  useEffect(() => {
    router.events.on('routeChangeComplete', pageview)
    return () => {
      router.events.off('routeChangeComplete', pageview)
    }
  }, [router.events])

  return (
    <>
          {/* Google Tag Manager - Global base code */}
          <Script
        id="gtag-base"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer', 'GTM-P2SV9WH');
          `,
        }}
      />
      <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
          <base href="/"/>
          <link rel="icon" type="image/x-icon" href="https://www.anizzama.com/favicon.ico"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="robots" content="index,follow"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="application-name" content="Anizzama"/>
          <meta name="og:email" content="anizzamasub@gmail.com"/>
          <meta name="subject" content="Fan Sub"/>
          <meta name="copyright"content="Anizzama"/>
          <meta name="url" content="https://www.anizzama.com"/>
          <meta name="identifier-URL" content="https://www.anizzama.com"/>
          <link rel="shortcut icon" type="image/ico" href="/favicon.ico"/>
          <meta http-equiv="content-language" content="iw_IL"/>
          <meta property="og:locale" content="he_IL"/>
      </Head>

      
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
