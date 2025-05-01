"use client";

import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import './styles.css';;
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { Topfilmes } from './styles';
import { getTopRatedMovies, getGenres, getTrendingMovies } from '../services/api';
import { Genre, Movie } from '../types/types';





export  default function TopfilmesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [years, setYears] = useState<number[]>([]);




  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;

  useEffect(() => {
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

    fetchData();
  }, []);



  const formatDate = (date:string) => {
    const year = new Date(date).getFullYear();
    return `${year}`;
  };

  const sortMoviesByYear = () => {
    const sortedMovies = [...movies].sort((a, b) => {
      const yearA = new Date(a.release_date).getFullYear();
      const yearB = new Date(b.release_date).getFullYear();
      return yearB- yearA; 
    });
  
    setMovies(sortedMovies); 
  };


  useEffect(() => {
    if (movies.length > 0) {
      sortMoviesByYear(); 
    }
  },[movies.length]); 

  // Função para obter o nome dos gêneros a partir dos IDs
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
        <SidebarComponent />
      </div>
      <div className="content-1">
        <Topfilmes darkMode={darkMode}>
          <section className="cadastro-1-movies">
            <h1 style={{ marginLeft: "1%" }}>TOP FILMES</h1>
            {movies.length > 0 ? (
              <ul className='lista'>
                {movies.map((movie) => (
                  <div key={movie.id} className='card'>
                    <div>
                      <img
                        className='poster'
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}

                      />
                      <h3>{movie.title}</h3>
                      <p className='nota'>Nota: {movie.vote_average?.toFixed(2)}</p>
                      <p className='genero'>Gêneros: {getGenreNames(movie.genre_ids)}</p>
                      <p className='lancamento'>Lançamento: {formatDate(movie.release_date)} </p>
                    </div>
                  </div>
                ))}
              </ul>
            ) : <p>filmes não encontrados</p>}


          </section>
        </Topfilmes>
      </div>
    </PageContainer>
  );
}
