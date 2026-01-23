"use client";
import { useContext, } from 'react';
import { useRouter } from 'next/navigation';
import { IoIosTrendingUp } from "react-icons/io";
import Sidebutton from './SideButton';
import { Sidebar } from './styles';
import { MdLocalMovies, MdSpaceDashboard } from 'react-icons/md';
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { GiRaiseZombie } from 'react-icons/gi';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { FaRegStar } from 'react-icons/fa';
import React from 'react';




export function SidebarComponent() {
  const router = useRouter();
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;



  return (
    <Sidebar darkMode={darkMode} >
      <div className="top">
        <img
          className='movie-logo'
          src={"/logo.png"}
        >

        </img>
      </div>
      <section className="admin-buttons">
        <div className="buttons">
          <Sidebutton icon={<MdSpaceDashboard />} tittle="Dashboard" onClick={() => router.push('/')} />
          <Sidebutton icon={<MdLocalMovies />} tittle="Top filmes" onClick={() => router.push('/topFilmes')} />
          <Sidebutton icon={<GiRaiseZombie />} tittle="Genêros" onClick={() => router.push('/generos')} />
          <Sidebutton icon={<IoIosTrendingUp />} tittle="Trending" onClick={() => router.push('/trending')} />
          <Sidebutton icon={<FaRegStar />} tittle="Favoritos" onClick={() => router.push('/favoritos')} />
        </div>
      </section>
      <div className='switch'>
        <ToggleSwitch />
      </div>


    </Sidebar>
  );
}
