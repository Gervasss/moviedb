"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { PageContainer } from "../components/PageContainer";
import { SidebarComponent } from "../components/sidebar";
import "./styles.css";
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { getTopRatedMovies, getGenres } from "../services/api";
import { Genre, Movie } from "../types/types";
import { NavbarComponent } from "../components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";

const FAVORITE_STORAGE_KEY = "favoriteMovieIds";

export default function TopfilmesClient() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);
  const [query, setQuery] = useState("");

  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("useContext must be used within a ThemeProvider");
  const { darkMode } = themeContext;

  // Carrega favoritos
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITE_STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setFavoriteMovieIds(parsed as number[]);
      }
    } catch (error) {
      console.error("Could not load favorites from localStorage", error);
    }
  }, []);

  // Carrega dados
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

  // Ordena por ano (desc)
  useEffect(() => {
    if (movies.length === 0) return;
    setMovies((prev) => {
      const sorted = [...prev].sort((a, b) => {
        const yearA = new Date(a.release_date).getFullYear();
        const yearB = new Date(b.release_date).getFullYear();
        return yearB - yearA;
      });
      return sorted;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [movies.length]);

  const toggleFavorite = (movieId: number) => {
    setFavoriteMovieIds((prev) => {
      const newFavorites = prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId];
      try {
        localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Could not save favorites to localStorage", error);
      }
      return newFavorites;
    });
  };

  const isFavorite = (movieId: number) => favoriteMovieIds.includes(movieId);

  const formatYear = (date: string) => {
    const year = new Date(date).getFullYear();
    return Number.isFinite(year) ? String(year) : "-";
  };

  const getGenreNames = (genreIds: number[]): string => {
    const names = genreIds
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean) as string[];
    return names.join(", ");
  };

  const filteredMovies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return movies;
    return movies.filter((m) => (m.title || "").toLowerCase().includes(q));
  }, [movies, query]);

  return (
    <PageContainer padding="0px" darkMode={darkMode}>
      <div className={`topShell ${darkMode ? "dark" : "light"}`}>
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
                <h1 className="pageTitle">Top Filmes</h1>
                <p className="pageSubtitle">Ranking, detalhes e favoritos</p>
              </div>

              <div className="pageSearch">
                <AiOutlineSearch className="pageSearchIcon" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar filme…"
                  aria-label="Buscar filme"
                  className="pageSearchInput"
                />
              </div>
            </header>
            <section className="scrollArea">
              {loading ? (
                <div className="loadingWrap">
                  <div className="loaderCard">
                    <div className="loaderDot" />
                    <h3>Carregando...</h3>
                  </div>
                </div>
              ) : filteredMovies.length > 0 ? (
                <ul className="movieGrid" aria-label="Lista de filmes">
                  {filteredMovies.map((movie, index) => {
                    const poster = movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "";
                    const fav = isFavorite(movie.id);

                    return (
                      <li key={`${movie.id}-${index}`} className={`movieCard ${fav ? "favorited" : ""}`}>
                        <div className="posterWrap">
                          {poster ? (
                            <img className="poster" src={poster} alt={movie.title} loading="lazy" />
                          ) : (
                            <div className="posterFallback">Sem poster</div>
                          )}

                          <button
                            type="button"
                            className={`favBtn ${fav ? "on" : ""}`}
                            onClick={() => toggleFavorite(movie.id)}
                            aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                            title={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                          >
                            {fav ? <FaStar /> : <FaRegStar />}
                          </button>

                          <div className="posterShade" />
                        </div>

                        <div className="movieBody">
                          <div className="movieTop">
                            <h3 className="movieTitle" title={movie.title}>
                              {movie.title}
                            </h3>

                            <div className="pillRow">
                              <span className="pill">
                                Nota <b>{movie.vote_average?.toFixed(2) ?? "0.00"}</b>
                              </span>
                              <span className="pill">
                                Ano <b>{formatYear(movie.release_date)}</b>
                              </span>
                            </div>
                          </div>

                          <p className="movieMeta">
                            <span className="metaLabel">Gêneros:</span>{" "}
                            {getGenreNames(movie.genre_ids) || "—"}
                          </p>

                          <div className="movieFooter">
                            <button
                              type="button"
                              className={`favAction ${fav ? "on" : ""}`}
                              onClick={() => toggleFavorite(movie.id)}
                            >
                              {fav ? "Remover" : "Favoritar"} {fav ? "★" : "☆"}
                            </button>

                            <span className="arrow">→</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="emptyState">
                  <p>Filmes não encontrados</p>
                  <span>Tente buscar por outro título.</span>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </PageContainer>
  );
}
