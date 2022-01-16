import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';
import ReactGA from 'react-ga'

function initizeAnalytics(){
  ReactGA.initialize("G-FTZMWKQBWQ")
  ReactGA.pageview('/HomePage')
  }
function MyApp({ Component, pageProps }) {

  initizeAnalytics()
  return (
    <>
      <Head>
          <title>anizzama</title>
          <link target="_blank" rel="icon" href='/bg/icon.webp'/>
          <meta name="google-site-verification" content="FojcSmKWD0kChqW_8sPC0fvRO6ppd-Svm9y534ps61Y" />

        </Head>
     
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
