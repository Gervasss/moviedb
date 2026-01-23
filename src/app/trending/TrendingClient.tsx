"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { PageContainer } from "../components/PageContainer";
import { SidebarComponent } from "../components/sidebar";
import "./styles.css";
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { getTrendingMovies, getGenres, getTopRatedMovies } from "../services/api";
import { Genre, Movie } from "../types/types";
import { NavbarComponent } from "../components/Navbar";
import { formatDate } from "./FormatDate";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";

const FAVORITE_STORAGE_KEY = "favoriteMovieIds";

export default function TrendingClient() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [topMovies, setTopMovies] = useState<Movie[]>([]);
  const [trendingTopRatedMovies, setTrendingTopRatedMovies] = useState<Movie[]>([]);
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState<string>("");
  const [showMovies, setShowMovies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);
  const [currentFilter, setCurrentFilter] = useState<"trending" | "topRated">("trending");
  const [query, setQuery] = useState("");

  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("useContext must be used within a ThemeProvider");
  const { darkMode } = themeContext;

  // favoritos
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITE_STORAGE_KEY);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (Array.isArray(parsed)) setFavoriteMovieIds(parsed as number[]);
      }
    } catch (e) {
      console.error("Could not load favorites from localStorage", e);
    }
  }, []);

  // fetch
  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      // Top rated
      let topRated: Movie[] = [];
      for (let page = 1; page <= 13; page++) {
        const result = await getTopRatedMovies(page);
        topRated = [...topRated, ...result];
      }
      topRated = topRated.slice(0, 250);
      setTopMovies(topRated);

      // Genres (cache)
      const storedGenres = localStorage.getItem("Genres");
      if (storedGenres) {
        setGenres(JSON.parse(storedGenres));
      } else {
        const list = await getGenres();
        setGenres(list);
        localStorage.setItem("Genres", JSON.stringify(list));
      }

      // Trending
      let tr: Movie[] = [];
      for (let page = 1; page <= 20; page++) {
        const result = await getTrendingMovies(page);
        tr = [...tr, ...result];
      }

      const uniqueTrending = tr.filter(
        (value, index, self) => index === self.findIndex((t) => t.id === value.id)
      );
      setTrendingMovies(uniqueTrending);

      const intersection = uniqueTrending.filter((m) => topRated.some((t) => t.id === m.id));
      setTrendingTopRatedMovies(intersection);

      if (uniqueTrending.length > 0) {
        setShowMovies(true);
        setMessage("");
      } else {
        setShowMovies(false);
        setMessage("Nenhum filme no trending");
      }
    };

    fetchData()
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, []);

  const toggleFavorite = (movieId: number) => {
    setFavoriteMovieIds((prev) => {
      const next = prev.includes(movieId) ? prev.filter((id) => id !== movieId) : [...prev, movieId];
      try {
        localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Could not save favorites to localStorage", e);
      }
      return next;
    });
  };

  const isFavorite = (movieId: number) => favoriteMovieIds.includes(movieId);

  const getGenreNames = (genreIds: number[]): string => {
    const names = genreIds
      .map((id) => genres.find((g) => g.id === id)?.name)
      .filter(Boolean) as string[];
    return names.join(", ");
  };

  const activeList = currentFilter === "trending" ? trendingMovies : trendingTopRatedMovies;

  const filteredMovies = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return activeList;
    return activeList.filter((m) => (m.title || "").toLowerCase().includes(q));
  }, [activeList, query]);

  return (
    <PageContainer padding="0px" darkMode={darkMode}>
      <div className={`trd-topShell ${darkMode ? "dark" : "light"}`}>
        <div className="trd-shell">
          <aside className="trd-sidebar">
            <div className="trd-desktopOnly">
              <SidebarComponent />
            </div>
          </aside>
          <main className="trd-main">
            <div className="trd-mobileOnly">
              <NavbarComponent />
            </div>
            <header className="trd-pageHeader">
              <div className="trd-pageHeaderLeft">
                <h1 className="trd-pageTitle">Trending Filmes</h1>
                <p className="trd-pageSubtitle">Tendências e recortes do Top Rated</p>
              </div>

              <div className="trd-pageSearch">
                <AiOutlineSearch className="trd-pageSearchIcon" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Buscar filme…"
                  aria-label="Buscar filme"
                  className="trd-pageSearchInput"
                />
              </div>
            </header>
            <section className="trd-filtersPanel" aria-label="Filtros e contador">
              <div className="trd-tabs" role="tablist" aria-label="Filtros de lista">
                <button
                  type="button"
                  className={`trd-tab ${currentFilter === "trending" ? "active" : ""}`}
                  onClick={() => setCurrentFilter("trending")}
                  aria-pressed={currentFilter === "trending"}
                >
                  Trending
                </button>

                <button
                  type="button"
                  className={`trd-tab ${currentFilter === "topRated" ? "active" : ""}`}
                  onClick={() => setCurrentFilter("topRated")}
                  aria-pressed={currentFilter === "topRated"}
                >
                  Top Trending
                </button>
              </div>

              <div className="trd-counterWrap">
                <span className="trd-counterPill">{loading ? "—" : `${filteredMovies.length} filmes`}</span>
              </div>
            </section>
            <section className="trd-scrollArea">
              {loading ? (
                <div className="trd-loadingWrap">
                  <div className="trd-loaderCard">
                    <div className="trd-loaderDot" />
                    <h3>Carregando...</h3>
                  </div>
                </div>
              ) : showMovies ? (
                filteredMovies.length > 0 ? (
                  <ul className="trd-movieGrid" aria-label="Lista de filmes">
                    {filteredMovies.map((movie, index) => {
                      const poster = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "";
                      const fav = isFavorite(movie.id);

                      return (
                        <li key={`${movie.id}-${index}`} className={`trd-movieCard ${fav ? "favorited" : ""}`}>
                          <div className="trd-posterWrap">
                            {poster ? (
                              <img className="trd-poster" src={poster} alt={movie.title} loading="lazy" />
                            ) : (
                              <div className="trd-posterFallback">Sem poster</div>
                            )}

                            <button
                              type="button"
                              className={`trd-favBtn ${fav ? "on" : ""}`}
                              onClick={() => toggleFavorite(movie.id)}
                              aria-label={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                              title={fav ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                            >
                              {fav ? <FaStar /> : <FaRegStar />}
                            </button>

                            <div className="trd-posterShade" />
                          </div>

                          <div className="trd-movieBody">
                            <div className="trd-movieTop">
                              <h3 className="trd-movieTitle" title={movie.title}>
                                {movie.title}
                              </h3>

                              <div className="trd-pillRow">
                                <span className="trd-pill">
                                  Nota <b>{movie.vote_average?.toFixed(2) ?? "0.00"}</b>
                                </span>
                                <span className="trd-pill">
                                  Ano <b>{formatDate(movie.release_date)}</b>
                                </span>
                              </div>
                            </div>

                            <p className="trd-movieMeta">
                              <span className="trd-metaLabel">Gêneros:</span> {getGenreNames(movie.genre_ids) || "—"}
                            </p>

                            <div className="trd-movieFooter">
                              <button
                                type="button"
                                className={`trd-favAction ${fav ? "on" : ""}`}
                                onClick={() => toggleFavorite(movie.id)}
                              >
                                {fav ? "Remover" : "Favoritar"} {fav ? "★" : "☆"}
                              </button>

                              <span className="trd-arrow">→</span>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="trd-emptyState">
                    <p>Nenhum filme encontrado</p>
                    <span>Tente buscar por outro título.</span>
                  </div>
                )
              ) : (
                <div className="trd-emptyState">
                  <p>{message || "Nada para mostrar"}</p>
                  <span>Tente novamente em instantes.</span>
                </div>
              )}
            </section>
          </main>
        </div>
      </div>
    </PageContainer>
  );
}
