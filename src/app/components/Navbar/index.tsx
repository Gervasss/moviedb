"use client";

import "./styles.css";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { Navbar } from "./styles";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import { IoClose, IoMenu } from "react-icons/io5";
import { AiOutlineSearch } from "react-icons/ai";
import { MdLocalMovies } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";
import { GiRaiseZombie } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";

type NavItem = {
  label: string;
  path: string;
  icon: React.ReactNode;
};

export function NavbarComponent() {
  const router = useRouter();
  const themeContext = useContext(ThemeContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  if (!themeContext) throw new Error("useContext must be used within a ThemeProvider");
  const { darkMode } = themeContext;

  const items: NavItem[] = [
    { label: "Dashboard", path: "/", icon: <MdLocalMovies /> },
    { label: "Gêneros", path: "/generos", icon: <GiRaiseZombie /> },
    { label: "Top Filmes", path: "/topFilmes", icon: <MdLocalMovies /> },
    { label: "Trending", path: "/trending", icon: <IoIosTrendingUp /> },
    { label: "Favoritos", path: "/favoritos", icon: <FaRegStar /> },
  ];

  const toggleMenu = () => setIsMenuOpen((v) => !v);

  const navigateAndClose = (path: string) => {
    router.push(path);
    setIsMenuOpen(false);
    setQuery("");
  };

  // trava scroll do body quando o drawer abre
  useEffect(() => {
    if (!isMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isMenuOpen]);

  // ESC fecha
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const filtered = items.filter((i) =>
    i.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <Navbar >
      <nav className="mnavBar" aria-label="Navegação">
        <button
          type="button"
          className="mnavMenuBtn"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <IoClose size={28} /> : <IoMenu size={28} />}
        </button>
        <br></br>
        
        {/* Overlay */}
        <div
          className={`mnavOverlay ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(false)}
          aria-hidden={!isMenuOpen}
        />

        {/* Drawer */}
        <aside className={`mnavDrawer ${isMenuOpen ? "open" : ""}`} aria-label="Menu">
          <div className="mnavDrawerHeader">
            <div className="mnavDrawerTitle">
              <span className="mnavDrawerTitleTop">Menu</span>
              <span className="mnavDrawerTitleSub">Navegue pelas seções</span>
            </div>

            <button
              type="button"
              className="mnavDrawerClose"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Fechar menu"
            >
              <IoClose size={22} />
            </button>
          </div>
          <div className="mnavPills" aria-label="Atalhos">
            <span className="mnavPill">{filtered.length} opções</span>
          </div>

          <div className="mnavList" role="list">
            {filtered.map((item) => (
              <button
                key={item.path}
                type="button"
                className="mnavItem"
                onClick={() => navigateAndClose(item.path)}
              >
                <span className="mnavItemIcon" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="mnavItemText">{item.label}</span>
                <span className="mnavItemArrow" aria-hidden="true">
                  →
                </span>
              </button>
            ))}

            {filtered.length === 0 && (
              <div className="mnavEmpty">
                <p>Nenhum item encontrado</p>
                <span>Tente outro termo.</span>
              </div>
            )}
         

          </div>
        </aside>
      </nav>
    </Navbar>
  );
}
