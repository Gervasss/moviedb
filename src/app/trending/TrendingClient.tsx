"use client";
import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import './styles.css';
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { Trending } from './styles';
import { getTrendingMovies, getGenres, getTopRatedMovies } from '../services/api';
import { Genre, Movie } from '../types/types';
import { NavbarComponent } from '../components/Navbar';
import { formatDate } from './FormatDate';
import React from "react";


const FAVORITE_STORAGE_KEY = 'favoriteMovieIds';

export default function TrendingClient() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [TopMovies, setTopMovies] = useState<Movie[]>([]);
  const [TrendingTopRatedMovies, setTrendingTopRatedMovies] = useState<Movie[]>([]);
  const [TrendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showMovies, setShowMovies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);

  // Estado que controla qual lista está sendo mostrada
  const [currentFilter, setCurrentFilter] = useState<'trending' | 'topRated'>('trending');

  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;


  useEffect(() => {
    try {
      // Tenta carregar os IDs favoritos do localStorage
      const storedFavorites = localStorage.getItem(FAVORITE_STORAGE_KEY);
      if (storedFavorites) {
        const favorites: number[] = JSON.parse(storedFavorites);
        // Garante que é um array de números
        if (Array.isArray(favorites)) {
          setFavoriteMovieIds(favorites);
        }
      }
    } catch (error) {
      console.error("Could not load favorites from localStorage", error);
    }
  }, []);

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      let topRatedMovies: Movie[] = [];
      for (let page = 1; page <= 13; page++) {
        const result = await getTopRatedMovies(page);
        topRatedMovies = [...topRatedMovies, ...result];
      }
      topRatedMovies = topRatedMovies.slice(0, 250);
      setTopMovies(topRatedMovies);

      const genresList = await getGenres();
      setGenres(genresList);

      let trendingMovies: Movie[] = [];
      for (let page = 1; page <= 20; page++) {
        const result = await getTrendingMovies(page);
        trendingMovies = [...trendingMovies, ...result];
      }

      // Remove duplicados
      const uniqueTrending = trendingMovies.filter(
        (value, index, self) => index === self.findIndex((t) => t.id === value.id)
      );

     
      setTrendingMovies(uniqueTrending);


      const intersection = uniqueTrending.filter(movie =>
        topRatedMovies.some(topMovie => topMovie.id === movie.id)
      );


      setTrendingTopRatedMovies(intersection);

      if (intersection.length > 0) {
        setShowMovies(true);
      } else {
        setMessage("Nenhum filme no trending");
      }
      setLoading(false);
    };

    fetchData();
  }, []);


  const toggleFavorite = (movieId: number) => {
    setFavoriteMovieIds(prevFavorites => {
      let newFavorites: number[];

      if (prevFavorites.includes(movieId)) {
        newFavorites = prevFavorites.filter(id => id !== movieId);
      } else {
        newFavorites = [...prevFavorites, movieId];
      }

      try {
        localStorage.setItem(FAVORITE_STORAGE_KEY, JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Could not save favorites to localStorage", error);
      }

      return newFavorites;
    });
  };

   

  const getGenreNames = (genreIds: number[]): string => {
    const genreNames = genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : '';
    });
    return genreNames.join(', ');
  };


  const showTrendingMovies = () => {
    setCurrentFilter('trending');
  };

  const showTopRatedMovies = () => {
    setCurrentFilter('topRated');
  };

  const isFavorite = (movieId: number): boolean => {
    return favoriteMovieIds.includes(movieId);
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
            <h1 >Trending Filmes</h1>
            {/* Botões para alternar as listas */}
            <div className='filters' style={{ marginBottom: '15px' }}>
              <button onClick={showTrendingMovies} disabled={currentFilter === 'trending'}>
                Trending Movies
              </button>
              <button onClick={showTopRatedMovies} disabled={currentFilter === 'topRated'} style={{ marginLeft: '10px' }}>
                Top  Trending
              </button>
            </div>

            {loading && (
              <div className="modal-overlay">
                <h3>Carregando...</h3>
              </div>
            )}

            {!loading && (
              <>
                <h5 className='counter'>
                  {(currentFilter === 'trending'
                    ? TrendingMovies.length
                    : TrendingTopRatedMovies.length
                  )} Filmes
                </h5>

                {showMovies ? (
                  <ul className='lista-trending'>
                    {(currentFilter === 'trending' ? TrendingMovies : TrendingTopRatedMovies).map((movie) => (
                      <div key={movie.id} className={`card-trending ${isFavorite(movie.id) ? 'favorited' : ''}`}>
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
                            onClick={() => toggleFavorite(movie.id)}
                          >
                            {isFavorite(movie.id) ? 'Remover ' : 'Favoritar ⭐'}
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
