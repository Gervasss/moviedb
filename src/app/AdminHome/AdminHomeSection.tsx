"use client";

import { useContext } from "react";
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

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }

  const { darkMode } = themeContext;

  return (
    <PageContainer className="admin" padding="0px" darkMode={darkMode}>
      <div className={styles.shell} data-theme={darkMode ? "dark" : "light"}>
        <aside className={styles.sidebar}>
          <SidebarComponent />
        </aside>
        <div className={styles.mobileNav}>
          <NavbarComponent />
        </div>
        <main className={styles.main}>
          <header className={styles.header}>
            <div className={styles.headerLeft}>
              <h1 className={styles.h1}>Dashboard</h1>
              <p className={styles.p}>Acesso rápido às principais seções</p>
            </div>
            <div className={styles.search}>
              <AiOutlineSearch className={styles.searchIcon} />
              <input
                className={styles.searchInput}
                placeholder="Buscar no painel…"
                aria-label="Buscar no painel"
              />
            </div>
          </header>
          <section className={styles.content}>
            <div className={styles.grid}>
              <DashCard
                title="Gêneros"
                subtitle="Categorias e filtros"
                icon={<GiRaiseZombie className={styles.bigIcon} />}
                onClick={() => router.push("/generos")}
                variant="primary"
              />
              <DashCard
                title="Top Filmes"
                subtitle="Ranking e destaques"
                icon={<MdLocalMovies className={styles.bigIcon} />}
                onClick={() => router.push("/topFilmes")}
                variant="success"
              />
              <DashCard
                title="Trending"
                subtitle="O que está bombando"
                icon={<IoIosTrendingUp className={styles.bigIcon} />}
                onClick={() => router.push("/trending")}
                variant="info"
              />
              <DashCard
                title="Favoritos"
                subtitle="Sua lista salva"
                icon={<FaRegStar className={styles.bigIcon} />}
                onClick={() => router.push("/favoritos")}
                variant="warning"
              />
            </div>

            {/* Panel */}
            <div className={styles.panel}>
              <div className={styles.panelHeader}>
                <span className={styles.panelTitle}>Visão geral</span>
                <span className={styles.panelChip}>Hoje</span>
              </div>
              <p className={styles.panelText}>
                
              </p>
            </div>
          </section>
        </main>
      </div>
    </PageContainer>
  );
}
