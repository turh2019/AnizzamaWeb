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
 

        </Head>
     
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
