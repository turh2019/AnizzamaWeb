import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
          <title>anizzama</title>
          <a link rel="icon" a href='/bg/icon.webp'/>
          <meta name="google-site-verification" content="BsaRssdN_eUFiWb0vDifoQ23ikfPZfCsPth93wPGlXg" />
        </Head>
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
