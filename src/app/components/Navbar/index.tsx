"use client";
import './styles.css';
import { useRouter } from 'next/navigation';
import { useContext, useState } from 'react';
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { Navbar } from './styles';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';
import { IoClose, IoMenu } from 'react-icons/io5';





export function NavbarComponent() {
  const router = useRouter();
  const themeContext = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navigateAndClose = (path: string) => {
    router.push(path);
    setIsMenuOpen(false); // Fecha o menu após a navegação
  };

  const { darkMode } = themeContext;
  return (
    <Navbar darkMode={darkMode}>
      <nav className="Navbar">
        <div className="NavButtons">
          <h1 className='navtitle' onClick={() => router.push("/")}>Movies db</h1>


          <div className="menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <IoClose size={45} /> : <IoMenu size={45} />}

          </div>
          {/* O menu que será exibido em primeiro plano */}
          <div className={`mobile-menu-list ${isMenuOpen ? 'menu-open' : ''}`}>
            <div className='dash-mobile'>
              <h1 onClick={() => navigateAndClose("/")}>  Dashboard</h1>
              <h1 onClick={() => navigateAndClose("/generos")}>Genêros</h1>
              <h1 onClick={() => navigateAndClose("/topFilmes")}>Top filmes</h1>
              <h1 onClick={() => navigateAndClose("/trending")}>Trending</h1>
              <div className='toggleswitch'>
                <ToggleSwitch />
              </div>

            </div>

          </div>




        </div>

      </nav>

    </Navbar>
  );
}
