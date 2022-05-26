import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>Anizzama</title>
          <a link rel="icon" a href='/public/favicon.ico'/>
          <meta name="google-site-verification" content="BsaRssdN_eUFiWb0vDifoQ23ikfPZfCsPth93wPGlXg" />
          <meta name="googlebot" content="noindex"/>
          <meta name="googlebot-news" content="nosnippet"></meta>
        </Head>
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
