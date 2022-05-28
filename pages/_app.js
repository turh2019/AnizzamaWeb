import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';
import TagManager from "react-gtm-module"

const tagManagerArgs = {
  id: "GTM-P2SV9WH",
}

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    TagManager.initialize(tagManagerArgs)
  }, [])

  return (
    <>
      <Head>
          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
          <title>אניזאמה - Anizzama.com</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
          <base href="/"/>
          <link rel="icon" type="image/x-icon" href="https://anizzama.vercel.app/favicon.ico"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="description" content="אניזאמה; אנימות לצפייה ישירה עם כתוביות בעברית!"/>
          <meta name="robots" content="index,follow"/>
          <meta property="og:title" content="אניזאמה - Anizzama.com"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="application-name" content="Anizzama"/>
      </Head>

      
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp

