"use client";

import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import '../trending/styles.css'; 
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { Trending } from '../trending/styles'; 
import { getTopRatedMovies, getGenres } from '../services/api';
import { Genre, Movie } from '../types/types';
import { NavbarComponent } from '../components/Navbar';


const FAVORITE_STORAGE_KEY = 'favoriteMovieIds';


export default function TopfilmesClient() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
  const [favoriteMovieIds, setFavoriteMovieIds] = useState<number[]>([]);





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
      const storedMovies = localStorage.getItem('topRatedMovies');
      if (storedMovies) {
        setMovies(JSON.parse(storedMovies));
      } else {
        let allMovies: Movie[] = [];
        for (let page = 1; page <= 13; page++) {
          try {
            const result = await getTopRatedMovies(page);
            allMovies = [...allMovies, ...result];
          } catch (error) {
            console.error('Erro ao buscar top rated movies na página', page, error);
            break;
          }
        }
        allMovies = allMovies.slice(0, 250);
        setMovies(allMovies);
        localStorage.setItem('topRatedMovies', JSON.stringify(allMovies));
      }
      const genresList = await getGenres();
      setGenres(genresList);
    };
    setTimeout(() => {
      setLoading(false);
    }, 300);
    fetchData();
  }, []);

  const toggleFavorite = (movieId: number) => {
    // Use o formato de função para garantir que você está usando o estado mais recente
    setFavoriteMovieIds(prevFavorites => {
      let newFavorites: number[];

      if (prevFavorites.includes(movieId)) {
        // Se já está, remove
        newFavorites = prevFavorites.filter(id => id !== movieId);
      } else {
        // Se não está, adiciona
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

  const formatDate = (date: string) => {
    const year = new Date(date).getFullYear();
    return `${year}`;
  };

  const sortMoviesByYear = () => {
    const sortedMovies = [...movies].sort((a, b) => {
      const yearA = new Date(a.release_date).getFullYear();
      const yearB = new Date(b.release_date).getFullYear();
      return yearB - yearA;
    });

    setMovies(sortedMovies);
  };


  useEffect(() => {
    if (movies.length > 0) {
      sortMoviesByYear();
    }
  }, [movies.length]);

  // Função para obter o nome dos gêneros a partir dos IDs
  const getGenreNames = (genreIds: number[]): string => {
    const genreNames = genreIds.map((id) => {
      const genre = genres.find((g) => g.id === id);
      return genre ? genre.name : '';
    });
    return genreNames.join(', ');
  };

   const isFavorite = (movieId: number): boolean => {
    return favoriteMovieIds.includes(movieId);
  };

  //no .map foi usando a combinação de movie.id com o index do filme ,pois estava dando conflito e indicando q existiam filmes que em algum momento 
  //possuiam o mesmo id ,entao dessa forma mesmo que tenha filmes com mesmo id a combinação com o index será única

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
            <h1 >TOP FILMES</h1>
            {loading && (
              <div className="modal-overlay">
                <h3>Carregando...</h3>
              </div>
            )}
            {!loading && (
              <>
                {movies.length > 0 ? (
                  <ul className='lista-trending'>
                    {movies.map((movie, index) => (
                      <div key={`${movie.id}-${index}`} className={`card-trending ${isFavorite(movie.id) ? 'favorited' : ''}`}>
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
                  <p>Filmes não encontrados</p>
                )}
              </>
            )}
          </section>
        </Trending>
      </div>

    </PageContainer>
  );
}

