import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import  Head  from 'next/head';
import { LinksTo, PostWidget, ShowProfile,EditProfile,Loader} from '../../components/getComponents';
import { GetmyProfileSlug, getAllProfiles } from '../../services/services';
import {useStateContext} from  '../../context/StateContext'

import * as Scroll from 'react-scroll';
import { Link, Button, Element, Events, animateScroll as scroll, scrollSpy, scroller } from 'react-scroll'

const profile = ({Profile}) => {
  var [isEdit, SetIsEdit] = useState(false)
  const {profile} = useStateContext();
 
 const router =useRouter();
 if(router.isFallback){
  return <Loader />
 }


    

  return (
    <>
      <div className="container mx-auto px-10 mb-8" >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="col-span-1 lg:col-span-8 " >
            <div className=' mt-20 mb-8 p-12 relative rounded-lg bg-black bg-opacity-20 text-white' id="body">
             
              {profile != undefined && profile.id == Profile[0].id && 
                <div className='text-white text-right'>
                    <button onClick={(e) => SetIsEdit(!isEdit)}> {isEdit ? "cancel" :"Edit" }</button>
                </div>
              }
              {!isEdit && <ShowProfile Profile={Profile[0]}/>}
              {isEdit && <EditProfile Profile={Profile[0]}/>}

      
            </div>
          </div>
          <div className="col-span-1 lg:col-span-4 float-left" >
            <div className="relative lg:sticky top-8">

            <PostWidget />
            <LinksTo />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default profile;


export async function getStaticProps({ params }) {
  const data = await GetmyProfileSlug(params.slug);
  
  return {
    props: {
      Profile: data,
    },
  };
}


export async function getStaticPaths() {
  const profiles = await getAllProfiles();
  return {
    paths: profiles.map((  { name } ) => ({ params: { slug:name } })),
    fallback: true,
  };
}
