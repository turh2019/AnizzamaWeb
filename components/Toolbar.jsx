import React from 'react';
import { SearchBar } from './getComponents';


const Toolbar = () => {
    return (
        <>
        <div className=' bg-contain bg-center bg-no-repeat  pb-3 bg-clip-padding  p-6 grid grid-cols-1 gap-4 content-start place-items-center '>
            <div className='place-self-end'>
                 <SearchBar/> 
            </div>           
        </div>
                
        </>
    )
}

export default Toolbar
