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
          <title>Anizzama</title>
          <link target="_blank" rel="icon" href='/bg/icon.png'/>
                    
          <meta property="og:url" content= {"https://anizzama.vercel.app/"+pageProps.slug}/>
          <meta property="og:title" content={pageProps.title}/>
          <meta property="og:description" content={pageProps.excerpt}/>
          <meta property="og:site_name" content="Anizzama"/>

        </Head>
     
      <Layout>
          <Component {...pageProps} />
       </Layout>
    </>
 
  )
}

export default MyApp
