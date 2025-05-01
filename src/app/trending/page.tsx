"use client";

import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import './styles.css';;
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import {  Trending } from './styles';
import { getTrendingMovies, getGenres, getTopRatedMovies } from '../services/api';
import { Genre, Movie } from '../types/types';





export  default function TrendingPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [years, setYears] = useState<number[]>([]);
  const [TopMovies, setTopMovies] = useState<Movie[]>([])
  const [message, setMessage] = useState<string>('');
  const [ShowMovies, setshowMovies] = useState(false);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [TrendingMovies, setTrendingMovies] = useState<Movie[]>([])






  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;

  useEffect(() => {
    const fetchData = async () => {
      let allMovies: Movie[] = [];
      for (let page = 1; page <= 13; page++) {
        const result = await getTopRatedMovies(page);
        allMovies = [...allMovies, ...result];
      }
      allMovies = allMovies.slice(0, 250);
      setTopMovies(allMovies);
  
      const genresList = await getGenres();
      setGenres(genresList);
   //metódo para fazer a chamada dos filmes que estão em trending nas primeiras 20 páginas 
      let trendingMovies: Movie[] = [];
      for (let page = 1; page <= 20; page++) {
        const result = await getTrendingMovies();
        trendingMovies = [...trendingMovies, ...result];
      }
      setMovies(trendingMovies);
     //metódo para verificar se exitem filmes do toprated em trending e quantos são
      const TrendingTopRatedMovies = trendingMovies.filter(movie =>
        allMovies.some(topMovie => topMovie.id === movie.id)
      );
  
      setTotalMovies(TrendingTopRatedMovies.length);
      setTrendingMovies(TrendingTopRatedMovies);
  
      if (TrendingTopRatedMovies.length > 0) {
        setshowMovies(true);
      } else {
        setMessage('Nenhum filme no trending');
      }

  //metódo para que não seja mostrado os filmes de forma duplicada
      const uniqueMovies = trendingMovies.filter(
        (value, index, self) => index === self.findIndex((t) => t.id === value.id)
      );

      setMovies(uniqueMovies)

    };
  
    fetchData();
  }, []);


  
 


  const formatDate = (date: string): string => {
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
  },[]); 

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
        <Trending darkMode={darkMode}>
        <section className="cadastro-1-movies">
        <h1 style={{ marginLeft: "1%" }}>Trending Filmes </h1>
        <h5>Filmes: {totalMovies}</h5>
          {ShowMovies?( 
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
            ):(
            <p>{message}</p>
          )}
          </section>
         
          
        </Trending>
      </div>
    </PageContainer>
  );
}
