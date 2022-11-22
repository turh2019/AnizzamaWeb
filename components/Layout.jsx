import React,{useState} from 'react';
import { Header,Toolbar,TopHeader } from './getComponents';
import Link from 'next/link';

import { BrowserRouter as Router } from 'react-router-dom';

const Layout = ({ children }) => {

    return (
        <>
            <TopHeader/>

            <Header />
            {children}   
        </>
    )
}

export default Layout
