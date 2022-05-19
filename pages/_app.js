import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';
import Script from "next/script";

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>
          <title>Anizzama</title>
         
          <meta property="og:title" content={pageProps.title}/>
          <meta property="og:description" content={pageProps.excerpt}/>
          <meta property="og:site_name" content="Anizzama"/>
          <meta property='keywords' content='אניזאמה, tags'/>
          <meta property='description' content='TestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTestingTesting'/>
          <meta property='subject' content='Fansub'/>
          <meta property='copyright' content='Anizzama'/>
          <meta property='language' content='HB'/>
          <meta property="og:url" content= {"https://anizzama.vercel.app/"+pageProps.slug}/>
          <meta property='og:email' content='anizzamasub@gmail.com'/>
          <meta property='og:country-name' content='Israel'/>
          <meta property='google-site-verification' content='google1ca3cf66adbe3977'/>
          <meta property='google-analytics' content='G-7V1874NXXG'/>
      </Head>

          <Script
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=G-7V1874NXXG`}
      />

      <Script strategy="lazyOnload">
        {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7V1874NXXG', {
              page_path: window.location.pathname,
            });
                `}
      </Script>
       
        
     
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
