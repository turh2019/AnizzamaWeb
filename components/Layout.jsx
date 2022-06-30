import React from 'react';
import { Header } from './getComponents';


const Layout = ({ children }) => {
    return (
        <>
          <Header />
          {children}          
        </>
    )
}

export default Layout
