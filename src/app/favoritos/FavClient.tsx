"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import { PageContainer } from "../components/PageContainer";
import { SidebarComponent } from "../components/sidebar";
import "./styles.css";
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { getGenres, getMovieById } from "../services/api";
import { Genre, Movie } from "../types/types";
import { NavbarComponent } from "../components/Navbar";
import { AiOutlineSearch } from "react-icons/ai";
import { FaRegStar, FaStar } from "react-icons/fa";

const FAVORITE_STORAGE_KEY = "favoriteMovieIds";

export default function FavoritesClient() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string>("");
    const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);
    const [query, setQuery] = useState("");

    const themeContext = useContext(ThemeContext);
    if (!themeContext) throw new Error("useContext must be used within a ThemeProvider");
    const { darkMode } = themeContext;

    // Carrega IDs favoritos
    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem(FAVORITE_STORAGE_KEY);
            if (storedFavorites) {
                const ids: unknown = JSON.parse(storedFavorites);
                if (Array.isArray(ids)) setFavoriteMovieIds(ids as number[]);
            }
        } catch (error) {
            console.error("Could not load favorites from localStorage", error);
        }
    }, []);

    // Carrega filmes favoritos
    useEffect(() => {
        if (favoriteMovieIds.length === 0) {
            setFavoriteMovies([]);
            setMessage("Você ainda não favoritou nenhum filme.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setMessage("");

        const fetchFavoritesData = async () => {
            // gêneros (pode cachear se quiser, como fez no trending)
            const storedGenres = localStorage.getItem("Genres");
            if (storedGenres) {
                setGenres(JSON.parse(storedGenres));
            } else {
                const genresList = await getGenres();
                setGenres(genresList);
                localStorage.setItem("Genres", JSON.stringify(genresList));
            }

            const moviePromises = favoriteMovieIds.map((id) => getMovieById(id));
            const results = await Promise.all(moviePromises);
            setFavoriteMovies(results.filter((m): m is Movie => !!m));
        };

        fetchFavoritesData()
            .catch((e) => {
                console.error(e);
                setMessage("Não foi possível carregar seus favoritos.");
            })
            .finally(() => setLoading(false));
    }, [favoriteMovieIds]);

    const isFavorite = (movieId: number) => favoriteMovieIds.includes(movieId);

    const removeFavorite = (movieId: number) => {
        setFavoriteMovieIds((prev) => {
            const next = prev.filter((id) => id !== movieId);
            try {
                localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(next));
            } catch (error) {
                console.error("Could not save favorites to localStorage", error);
            }
            return next;
        });
    };

    const toggleFavorite = (movieId: number) => {
        // nessa página, toggle = remove (mas mantive a função pra UX consistente)
        if (isFavorite(movieId)) removeFavorite(movieId);
    };

    const formatYear = (date: string): string => {
        if (!date) return "—";
        const year = new Date(date).getFullYear();
        return `${year}`;
    };

    const getGenreNames = (genreIds: number[]): string => {
        const names = genreIds
            .map((id) => genres.find((g) => g.id === id)?.name)
            .filter(Boolean) as string[];
        return names.join(", ");
    };

    const filteredFavorites = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return favoriteMovies;
        return favoriteMovies.filter((m) => (m.title || "").toLowerCase().includes(q));
    }, [favoriteMovies, query]);

    return (
        <PageContainer padding="0px" darkMode={darkMode}>
            <div className={`fav-topShell ${darkMode ? "dark" : "light"}`}>
                <div className="fav-shell">
                    <aside className="fav-sidebar">
                        <div className="fav-desktopOnly">
                            <SidebarComponent />
                        </div>
                    </aside>
                    <main className="fav-main">
                        <div className="fav-mobileOnly">
                            <NavbarComponent />
                        </div>
                        <header className="fav-pageHeader">
                            <div className="fav-pageHeaderLeft">
                                <h1 className="fav-pageTitle">Meus Favoritos</h1>
                                <p className="fav-pageSubtitle">Sua lista salva, pronta para revisitar</p>
                            </div>

                            <div className="fav-pageSearch">
                                <AiOutlineSearch className="fav-pageSearchIcon" />
                                <input
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Buscar favorito…"
                                    aria-label="Buscar favorito"
                                    className="fav-pageSearchInput"
                                />
                            </div>
                        </header>
                        <section className="fav-filtersPanel" aria-label="Contador de favoritos">
                           
                            <div className="fav-counterWrap">
                                <span className="fav-counterPill">
                                    {loading ? "—" : `${filteredFavorites.length} filmes`}
                                </span>
                            </div>
                        </section>
                        <section className="fav-scrollArea">
                            {loading ? (
                                <div className="fav-loadingWrap">
                                    <div className="fav-loaderCard">
                                        <div className="fav-loaderDot" />
                                        <h3>Carregando...</h3>
                                    </div>
                                </div>
                            ) : filteredFavorites.length > 0 ? (
                                <ul className="fav-movieGrid" aria-label="Lista de filmes favoritos">
                                    {filteredFavorites.map((movie) => {
                                        const poster = movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : "";
                                        const fav = isFavorite(movie.id);

                                        return (
                                            <li key={movie.id} className={`fav-movieCard ${fav ? "favorited" : ""}`}>
                                                <div className="fav-posterWrap">
                                                    {poster ? (
                                                        <img
                                                            className="fav-poster"
                                                            src={poster}
                                                            alt={movie.title}
                                                            loading="lazy"
                                                        />
                                                    ) : (
                                                        <div className="fav-posterFallback">Sem poster</div>
                                                    )}

                                                    <button
                                                        type="button"
                                                        className={`fav-favBtn ${fav ? "on" : ""}`}
                                                        onClick={() => toggleFavorite(movie.id)}
                                                        aria-label="Remover dos favoritos"
                                                        title="Remover dos favoritos"
                                                    >
                                                        {fav ? <FaStar /> : <FaRegStar />}
                                                    </button>

                                                    <div className="fav-posterShade" />
                                                </div>

                                                <div className="fav-movieBody">
                                                    <h3 className="fav-movieTitle" title={movie.title}>
                                                        {movie.title}
                                                    </h3>

                                                    <div className="fav-pillRow">
                                                        <span className="fav-pill">
                                                            Nota <b>{movie.vote_average?.toFixed(2) ?? "0.00"}</b>
                                                        </span>
                                                        <span className="fav-pill">
                                                            Ano <b>{formatYear(movie.release_date)}</b>
                                                        </span>
                                                    </div>

                                                    <p className="fav-movieMeta">
                                                        <span className="fav-metaLabel">Gêneros:</span>{" "}
                                                        {getGenreNames(movie.genre_ids) || "—"}
                                                    </p>

                                                    <div className="fav-movieFooter">
                                                        <button
                                                            type="button"
                                                            className="fav-favAction"
                                                            onClick={() => removeFavorite(movie.id)}
                                                        >
                                                            Remover ★
                                                        </button>

                                                        <span className="fav-arrow">→</span>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            ) : (
                                <div className="fav-emptyState">
                                    <p>{message || "Nenhum favorito encontrado"}</p>
                                    <span>{message ? "Favorite filmes no Trending/Top." : "Tente buscar por outro título."}</span>
                                </div>
                            )}
                        </section>
                    </main>
                </div>
            </div>
        </PageContainer>
    );
}
