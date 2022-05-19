import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';
import Script from "next/script";

function MyApp({ Component, pageProps }) {
//PageProps.excerpt != null ? PageProps.excerpt : "x";

  return (
    <>
      <Head>
          <title>Anizzama</title>
         
          <meta property="og:title" content={pageProps.title}/>
          <meta property="og:description" content={PageProps.excerpt}/>
          <meta property="og:site_name" content="Anizzama"/>
          if(pageProps.slug) { <meta property="og:url" content= {"https://anizzama.vercel.app/"+pageProps.slug}/> } else { <meta property="og:url" content= "https://anizzama.vercel.app/"/> }
          <meta name='google-site-verification' content='9RHiqEM-8CzRKtB5oud1dZVkRjFbr_PaUqSukpiwhys'/>
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
