
"use client";
import React, { useContext } from 'react';
import { ThemeContext } from "../ThemeContext/ThemeContext";
import './styles.css'; 
import { GoSun } from 'react-icons/go';
import { FaRegMoon } from 'react-icons/fa';

const ToggleSwitch = () => {
  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("ToggleSwitch must be used within a ThemeProvider");
  }
  const { darkMode, setDarkMode } = themeContext;

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="toggle-switch-container">
      <input 
        type="checkbox" 
        id="darkModeToggle" 
        className="toggle-switch-checkbox" 
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor="darkModeToggle" className="toggle-switch-label">
        <div className="toggle-switch-inner"></div>
        <div className="toggle-switch-handle">
        {darkMode ? <FaRegMoon className="iconn moon-icon" /> : <GoSun className="iconn sun-icon" />}
        </div>
      </label>
    </div>
  );
};

export default ToggleSwitch;