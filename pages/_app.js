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
          <link rel="icon" href='/bg/icon.png'/>
        </Head>
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
