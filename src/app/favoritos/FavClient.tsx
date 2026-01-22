"use client";
import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import '../trending/styles.css'; 
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { Trending } from '../trending/styles'; 
import { getGenres, getMovieById } from '../services/api'; 
import { Genre, Movie } from '../types/types';
import { NavbarComponent } from '../components/Navbar';

const FAVORITE_STORAGE_KEY = 'favoriteMovieIds';

export default function FavoritesClient() {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState<string>('');
    const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);

    const themeContext = useContext(ThemeContext);
    if (!themeContext) {
        throw new Error("useContext must be used within a ThemeProvider");
    }
    const { darkMode } = themeContext;

 
    useEffect(() => {
        try {
            const storedFavorites = localStorage.getItem(FAVORITE_STORAGE_KEY);
            if (storedFavorites) {
                const ids: number[] = JSON.parse(storedFavorites);
                if (Array.isArray(ids)) {
                    setFavoriteMovieIds(ids);
                }
            }
        } catch (error) {
            console.error("Could not load favorites from localStorage", error);
        }
       
    }, []);


    useEffect(() => {
        if (favoriteMovieIds.length === 0) {
            setFavoriteMovies([]);
            setMessage("Você ainda não favoritou nenhum filme.");
            setLoading(false);
            return;
        }

        setLoading(true);
        setMessage('');

        const fetchFavoritesData = async () => {
            const genresList = await getGenres();
            setGenres(genresList);
            const moviePromises = favoriteMovieIds.map(id => getMovieById(id));
            const results = await Promise.all(moviePromises);

    
            setFavoriteMovies(results.filter((movie): movie is Movie => !!movie));
            setLoading(false);
        };

        fetchFavoritesData();
    }, [favoriteMovieIds]); 


    const isFavorite = (movieId: number): boolean => {
        return favoriteMovieIds.includes(movieId);
    };

    const removeFavorite = (movieId: number) => {
        setFavoriteMovieIds(prevFavorites => {
            const newIds = prevFavorites.filter(id => id !== movieId);

            try {
                localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(newIds));
            } catch (error) {
                console.error("Could not save favorites to localStorage", error);
            }

            return newIds; 
        });
    };


    const formatDate = (date: string): string => {
        if (!date) return 'N/A';
        const year = new Date(date).getFullYear();
        return `${year}`;
    };

    const getGenreNames = (genreIds: number[]): string => {
        const genreNames = genreIds.map((id) => {
            const genre = genres.find((g) => g.id === id);
            return genre ? genre.name : '';
        });
        return genreNames.join(', ');
    };



    return (
        <PageContainer padding="0px" darkMode={darkMode}>
            <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
                <div className='desktop-only'>
                    <SidebarComponent />
                </div >
                <div className='mobile-only'>
                    <NavbarComponent />
                </div>
            </div>
            <div className="content-1">
                <Trending darkMode={darkMode}>
                    <section className="cadastro-1-movies">
                        <h1>Meus Filmes Favoritos</h1>

                        {loading && (
                            <div className="modal-overlay">
                                <h3>Carregando...</h3>
                            </div>
                        )}

                        {!loading && (
                            <>
                                <h5 className='counter'>
                                    {favoriteMovies.length} Filmes Favoritados
                                </h5>

                                {favoriteMovies.length > 0 ? (
                                    <ul className='lista-trending'>
                                        {favoriteMovies.map((movie) => (
                                            <div
                                                key={movie.id}
                                                className={`card-trending favorited`}
                                            >
                                                <div>
                                                    <img
                                                        className='poster'
                                                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                                        alt={movie.title}
                                                    />
                                                    <h3>{movie.title}</h3>
                                                    <p className='nota'>Nota: {movie.vote_average?.toFixed(2)}</p>
                                                    <p className='genero'>Gêneros: {getGenreNames(movie.genre_ids)}</p>
                                                    <p className='lancamento'>Lançamento: {formatDate(movie.release_date)}</p>
                                                    <br></br>
                                                    <button
                                                        className='button-favorito'
                                                        onClick={() => removeFavorite(movie.id)}
                                                    >
                                                        Remover 
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </ul>
                                ) : (
                                    <p>{message}</p>
                                )}
                            </>
                        )}
                    </section>
                </Trending>
            </div>
        </PageContainer>
    );
}