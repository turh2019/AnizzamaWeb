import React, { useState, useEffect } from 'react';



const BoxMessage = ({items }) => {
 
  
  return (
   
      <div className=' '    >
         <button type='scroll'></button>
          {items.map((item) =>(item)) }
      </div>  

  );
};

export default BoxMessage;