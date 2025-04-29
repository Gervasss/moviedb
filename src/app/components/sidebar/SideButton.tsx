
"use client";

import React, { ReactNode } from 'react';
import { IoChevronForwardSharp } from 'react-icons/io5';




interface SidebuttonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tittle: string;
    icon: ReactNode;
}

export default function Sidebutton({ tittle,icon, onClick }: SidebuttonProps) {


  return (
    <button type="button" className="sideButton" onClick={onClick}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
      <div className="icon-Sidebar">{icon}</div>
       <div className='title-Sidebar'> {tittle}</div> 
      </div>

      <IoChevronForwardSharp />
    </button>
  );
}
