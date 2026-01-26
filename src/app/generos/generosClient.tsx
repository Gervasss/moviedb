"use client";

import {  useEffect, useMemo, useState } from "react";
import { SidebarComponent } from "../components/sidebar";
import "./styles.css";
import { getTopRatedMovies, getGenres } from "../services/api";
import { Genre, Movie } from "../types/types";
import { NavbarComponent } from "../components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";

export default function GenerosClient() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreAverages, setGenreAverages] = useState<{ [key: string]: number }>({});
  const [genreMovies, setGenreMovies] = useState<{ [key: string]: number }>({});
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");


  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      const storedMovies = localStorage.getItem("topRatedMovies");

      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        let allMovies: Movie[] = [];
        for (let page = 1; page <= 13; page++) {
          try {
            const result = await getTopRatedMovies(page);
            allMovies = [...allMovies, ...result];
          } catch (error) {
            console.error("Erro ao buscar top rated movies na página", page, error);
            break;
          }
        }
        allMovies = allMovies.slice(0, 250);
        setMovies(allMovies);
        localStorage.setItem("topRatedMovies", JSON.stringify(allMovies));
      }

      const storedGenres = localStorage.getItem("Genres");
      if (storedGenres) {
        setGenres(JSON.parse(storedGenres));
      } else {
        const genresList = await getGenres();
        setGenres(genresList);
        localStorage.setItem("Genres", JSON.stringify(genresList));
      }
    };

    fetchData().finally(() => {
      setTimeout(() => setLoading(false), 300);
    });
  }, []);

  useEffect(() => {
    if (genres.length === 0) return;

    const averages: { [key: string]: number } = {};
    const counts: { [key: string]: number } = {};

    genres.forEach((genre) => {
      const related = movies.filter((m) => m.genre_ids.includes(genre.id));
      counts[genre.name] = related.length;

      if (related.length > 0) {
        const total = related.reduce((acc, m) => acc + m.vote_average, 0);
        averages[genre.name] = total / related.length;
      } else {
        averages[genre.name] = 0;
      }
    });

    setGenreAverages(averages);
    setGenreMovies(counts);
  }, [movies, genres]);

  const filteredGenres = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return genres;
    return genres.filter((g) => g.name.toLowerCase().includes(q));
  }, [genres, query]);

  return (
 
      <div className="genresShell ">
        <div className="shell">
          <aside className="sidebar">
            <div className="desktop-only">
              <SidebarComponent />
            </div>
          </aside>
          <main className="main">
            <div className="mobile-only">
              <NavbarComponent />
            </div>
            <header className="pageHeader">
              <div className="pageHeaderLeft">
                <h1 className="pageTitle">Gêneros</h1>
                <p className="pageSubtitle">Métricas e panorama por categoria</p>
              </div>

              <div className="pageSearch">
                <AiOutlineSearch className="pageSearchIcon" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar gênero…"
                  aria-label="Buscar gênero"
                  className="pageSearchInput"
                />
              </div>
            </header>
            <section className="g-scrollArea">
              {loading ? (
                <div className="loadingWrap">
                  <div className="loaderCard">
                    <div className="loaderDot" />
                    <h3>Carregando...</h3>
                  </div>
                </div>
              ) : filteredGenres.length > 0 ? (
                <ul className="lista-genero">
                  {filteredGenres.map((genre) => (
                    <li key={genre.id} className="card-genero">
                      <div className="card-header">
                        <span className="badge">Gênero</span>
                        <h3 className="genero">{genre.name}</h3>
                      </div>

                      <div className="metrics">
                        <div className="metric">
                          <span className="metric-label">Média</span>
                          <span className="metric-value">
                            {(genreAverages[genre.name] ?? 0).toFixed(2)}
                          </span>
                        </div>

                        <div className="metric">
                          <span className="metric-label">Total</span>
                          <span className="metric-value">{genreMovies[genre.name] ?? 0}</span>
                        </div>
                      </div>

                      <div className="card-footer">
                        <span className="hint">Ver detalhes</span>
                        <span className="arrow">→</span>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="emptyState">
                  <p>Gêneros não encontrados</p>
                  <span>Tente buscar por outro nome.</span>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
  );
}
