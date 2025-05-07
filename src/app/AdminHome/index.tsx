"use client";

import  { useContext, useEffect, useState } from 'react';
import {  AiOutlineSearch } from 'react-icons/ai';
import { PageContainer} from '../components/PageContainer';
import   '../services/api';
import { ShowCard } from './Showcard';
import {  TopContainer } from './styles';
import { useRouter } from 'next/navigation';

import { SidebarComponent } from '../components/sidebar/index';
import { MdLocalMovies} from "react-icons/md";
import { IoIosTrendingUp } from 'react-icons/io';
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { GiRaiseZombie } from 'react-icons/gi';
import { IoCalendarNumberOutline } from 'react-icons/io5';




export  function AdminHome() {
  const router = useRouter();


  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }

  const { darkMode } = themeContext;
  

 


  return (
    <PageContainer className='admin' padding="0px"  darkMode={darkMode} >
     
     <div style={{height:"90%",width:"94.8%",marginTop:"10px",marginLeft:"10px"}}>
        <SidebarComponent  />
        </div>
      <TopContainer  darkMode={darkMode}>
      <div className="right">
          <div className="search">
            <input type="text" placeholder="Pesquise aqui.." />
            <AiOutlineSearch /> 
          </div>
        </div>
      </TopContainer>
      <div className='dash' >                   
        <ShowCard title="Genêros"  icon={<GiRaiseZombie  onClick={() => router.push('/generos')} style={{ cursor: "pointer" }} />} />
        <ShowCard title="Top Filmes"  icon={<MdLocalMovies  onClick={() => router.push('/topFilmes')} style={{ cursor: "pointer" }} />} />
        <ShowCard title="Trending"  icon={<IoIosTrendingUp   onClick={() => router.push('/trending')} style={{ cursor: "pointer" }} />} />   
      </div>
      
    </PageContainer>
  );
}
