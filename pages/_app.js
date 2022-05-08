import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';
import {useRouter} from 'next/router'
import Script from 'next/script'

import * as ga from '../lib/google-analytics'

function MyApp({ Component, pageProps }) {

  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url) => {
      ga.pageview(url)
    }

    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return(
    <>
          <Head>
          <title>Anizzama</title>
         
          <meta property="og:title" content={pageProps.title}/>
          <meta property="og:description" content={pageProps.excerpt}/>
          <meta property="og:site_name" content="Anizzama"/>
          <meta property="og:url" content= {"https://anizzama.vercel.app/"+pageProps.slug}/>
       
        </Head>

      <Script src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_MEASUREMENT_ID}`} strategy='afterInteractive' />
      <Script id="google-analytics" strategy='afterInteractive'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${process.env.NEXT_PUBLIC_MEASUREMENT_ID}');
        `}
      </Script>
      <Layout>
      <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp



