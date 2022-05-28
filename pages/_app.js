import React,{useEffect,useState} from 'react';
import  Head  from 'next/head';
import { Layout } from '../components/getComponents';
import 'tailwindcss/tailwind.css';
import '../Stayle/globals.scss';
import ReactDOM from 'react-dom'
import Router from 'react-router'
import routes from './routes'
import TagManager from 'react-gtm-module'

const tagManagerArgs = {
    gtmId: 'GTM-P2SV9WH'
}

TagManager.initialize(tagManagerArgs)

const app = document.getElementById('app')
ReactDOM.render(<Router routes={routes} />, app)

function MyApp({ Component, pageProps }) {

  return (
    <>
      <Head>

          <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
          <title>Anizzama</title>
          <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no"/>
          <base href="."/>
          <link rel="icon" type="image/x-icon" href="/public/favicon.ico"/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="description" content=""/>
          <meta name="robots" content="index,follow"/>
          <meta property="og:title" content={pageProps.title}/>
          <meta name="mobile-web-app-capable" content="yes"/>
          <meta name="application-name" content="Anizzama"/>
          <meta name="theme-color" content="#ffffff"/>
          <meta property="og:description" content={pageProps.excerpt}/>
          <meta property="og:site_name" content="Anizzama"/>
          <meta property="og:url" content= {"https://anizzama.vercel.app/"+pageProps.slug}/>
          <meta name='google-site-verification' content='BsaRssdN_eUFiWb0vDifoQ23ikfPZfCsPth93wPGlXg'/>
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

/*/public/favicon.ico
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>מה הפדיחה הכי גדולה שחברים שלכם עשו לכם? - סטיפס</title>
<base href=".">
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no">
<link rel="icon" type="image/x-icon" href="/public/favicon.ico">
<meta name="mobile-web-app-capable" content="yes">
<meta name="description" content="בואו לשתף את הידע והרעיונות שלכם עם העולם, להכיר אנשים חדשים ודעות חדשות.">
<meta name="robots" content="index,follow">
<meta property="og:title" content="סטיפס - Stips.co.il">
<meta name="mobile-web-app-capable" content="yes">
<meta name="application-name" content="Stips">
<meta name="apple-mobile-web-app-title" content="Stips">
<meta name="theme-color" content="#ffffff">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="msapplication-starturl" content="/?pwa_ver=1.0">
<link rel="icon" type="image/png" sizes="144X144" href="https://stips.co.il/images/stipsapp/icons/mipmap-xxhdpi/ic_launcher.png">
<link rel="apple-touch-icon" type="image/png" sizes="144X144" href="https://stips.co.il/images/stipsapp/icons/mipmap-xxhdpi/ios_icon.png">

<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width">
<meta property="og:title">
<meta property="og:description">
<meta property="og:site_name" content="Anizzama">
<meta property="og:url" content="https://anizzama.vercel.app/undefined">
<meta name="google-site-verification" content="BsaRssdN_eUFiWb0vDifoQ23ikfPZfCsPth93wPGlXg">
<meta name="googlebot" content="noindex">
<meta name="googlebot-news" content="nosnippet">
<meta property="og:site_name" content="Anizzama">
<title>Anizzama</title><meta property="og:title" content="אהבה מתוסבכת פרק 3!🤩">
<meta property="og:description" content="ערב טוב 👋, היום הבאנו לכם את הפרק השלישי בסדרה &quot;אהבה מתוסבכת&quot;! ">
<meta property="og:url" content="https://anizzama.vercel.app/lovely-complex-episode-03">
<meta property="og:image" content="https://media.graphassets.com/RLwzqjdmQzutaPpImqpq">
<meta name="next-head-count" content="15">
<link rel="preload" href="./Anizzama_files/ac278b8c837e8c1a.css" as="style"><link rel="stylesheet" href="./Anizzama_files/ac278b8c837e8c1a.css" data-n-g="">
 */