"use client";

import React, { useContext, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./AdminHome.module.css";

import { PageContainer } from "../components/PageContainer";
import { SidebarComponent } from "../components/sidebar/index";
import { NavbarComponent } from "../components/Navbar";
import { ThemeContext } from "../components/ThemeContext/ThemeContext";

import { MdLocalMovies } from "react-icons/md";
import { IoIosTrendingUp } from "react-icons/io";
import { GiRaiseZombie } from "react-icons/gi";
import { FaRegStar } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";

type DashCardProps = {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: "primary" | "success" | "warning" | "info";
};

function DashCard({
  title,
  subtitle,
  icon,
  onClick,
  variant = "primary",
}: DashCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${styles.card} ${styles[variant]}`}
      aria-label={title}
    >
      <div className={styles.cardTop}>
        <div className={styles.iconWrap}>{icon}</div>
        <div className={styles.texts}>
          <span className={styles.cardTitle}>{title}</span>
          <span className={styles.cardSubtitle}>{subtitle}</span>
        </div>
      </div>

      <div className={styles.cardBottom}>
        <span className={styles.cardHint}>Abrir</span>
        <span className={styles.cardArrow}>→</span>
      </div>
    </button>
  );
}

export function AdminHome() {
  const router = useRouter();
  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("useContext must be used within a ThemeProvider");
  const { darkMode } = themeContext;

  const [query, setQuery] = useState("");

  const cards = useMemo(
    () => [
      {
        key: "generos",
        title: "Gêneros",
        subtitle: "Categorias e médias",
        icon: <GiRaiseZombie className={styles.bigIcon} />,
        onClick: () => router.push("/generos"),
        variant: "primary" as const,
      },
      {
        key: "topfilmes",
        title: "Top Filmes",
        subtitle: "Ranking e destaques",
        icon: <MdLocalMovies className={styles.bigIcon} />,
        onClick: () => router.push("/topFilmes"),
        variant: "success" as const,
      },
      {
        key: "trending",
        title: "Trending",
        subtitle: "O que está bombando",
        icon: <IoIosTrendingUp className={styles.bigIcon} />,
        onClick: () => router.push("/trending"),
        variant: "info" as const,
      },
      {
        key: "favoritos",
        title: "Favoritos",
        subtitle: "Sua lista salva",
        icon: <FaRegStar className={styles.bigIcon} />,
        onClick: () => router.push("/favoritos"),
        variant: "warning" as const,
      },
    ],
    [router]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cards;
    return cards.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle.toLowerCase().includes(q)
    );
  }, [cards, query]);

  return (
    <PageContainer className="admin" padding="0px" darkMode={darkMode}>
      <div className={styles.topShell} data-theme={darkMode ? "dark" : "light"}>
        <div className={styles.shell}>
          {/* Sidebar (desktop) */}
          <aside className={styles.sidebar}>
            <div className={styles.desktopOnly}>
              <SidebarComponent />
            </div>
          </aside>

          {/* Main */}
          <main className={styles.main}>
            {/* Navbar mobile */}
            <div className={styles.mobileOnly}>
              <NavbarComponent />
            </div>

            {/* Header */}
            <header className={styles.pageHeader}>
              <div className={styles.pageHeaderLeft}>
                <h1 className={styles.pageTitle}>Dashboard</h1>
                <p className={styles.pageSubtitle}>Acesso rápido às principais seções</p>
              </div>

              <div className={styles.pageSearch}>
                <AiOutlineSearch className={styles.pageSearchIcon} />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={styles.pageSearchInput}
                  placeholder="Buscar no painel…"
                  aria-label="Buscar no painel"
                />
              </div>
            </header>

            {/* Filters/Counter (mesma pegada do trending) */}
            <section className={styles.filtersPanel} aria-label="Resumo do painel">
              <div className={styles.counterWrap}>
                <span className={styles.counterPill}>
                  {filtered.length} seções
                </span>
                <span className={styles.counterHint}>Clique em um card para abrir</span>
              </div>

              <div className={styles.quickPills} aria-label="Atalhos rápidos">
                <span className={styles.quickPill}>Glass UI</span>
                <span className={styles.quickPill}>Tema {darkMode ? "Dark" : "Light"}</span>
              </div>
            </section>

            {/* Scroll area (pra não vazar e manter sidebar full) */}
            <section className={styles.scrollArea}>
              <div className={styles.grid}>
                {filtered.map((c) => (
                  <DashCard
                    key={c.key}
                    title={c.title}
                    subtitle={c.subtitle}
                    icon={c.icon}
                    onClick={c.onClick}
                    variant={c.variant}
                  />
                ))}
              </div>

              <div className={styles.panel}>
                <div className={styles.panelHeader}>
                  <span className={styles.panelTitle}>Visão geral</span>
                  <span className={styles.panelChip}>Hoje</span>
                </div>

                <p className={styles.panelText}>
                  Use o campo de busca para filtrar seções do painel.
                </p>
              </div>
            </section>
          </main>
        </div>
      </div>
    </PageContainer>
  );
}
