"use client";

import { ReactNode, useContext } from 'react';
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { CardContainer } from './styles';


interface ShowCardProps {
  title: string;
  icon: ReactNode;
}

export function ShowCard({ title,  icon }: ShowCardProps) {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode} = themeContext;

  return (
    <CardContainer style={{ height: '80px' }} darkMode={darkMode}>
      <div className="icon">{icon}</div>
      <div className="desc">
        <h1>{title}</h1>
       
      </div>
    </CardContainer>
  );
}
