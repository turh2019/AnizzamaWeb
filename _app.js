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
          <meta name='google-site-verification' content='BsaRssdN_eUFiWb0vDifoQ23ikfPZfCsPth93wPGlXg'/>
          <link rel="shortcut icon" href="/public/favicon.ico"></link>
        </Head>
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
