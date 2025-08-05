"use client";

import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import './styles.css';;
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import {  Topfilmes } from './styles';
import { getTopRatedMovies, getGenres} from '../services/api';
import { Genre, Movie } from '../types/types';
import { NavbarComponent } from '../components/Navbar';





export  default function TopfilmesClient() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);
 




  const themeContext = useContext(ThemeContext);

  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;

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

//no .map foi usando a combinação de movie.id com o index do filme ,pois estava dando conflito e indicando q existiam filmes que em algum momento 
//possuiam o mesmo id ,entao dessa forma mesmo que tenha filmes com mesmo id a combinação com o index será única

  return (
    <PageContainer padding="0px" darkMode={darkMode}>
     
          <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
            <div className='desktop-only'>
          <SidebarComponent  />
         </div > 
          <div className='mobile-only'>
                 <NavbarComponent />
                 </div>
          </div>
          <div className="content-1">
            <Topfilmes darkMode={darkMode}>
              <section className="cadastro-1-movies">
                <h1 style={{ marginLeft: "1%" }}>TOP FILMES</h1>
                {loading && (
              <div className="modal-overlay">
                <h3>Carregando...</h3>
              </div>
            )}
            {!loading && (
            <>
                {movies.length > 0 ? (
                  <ul className='lista'>
                    {movies.map((movie,index) => (
                      <div key={`${movie.id}-${index}`} className='card'>
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
            </Topfilmes>
          </div>
      
    </PageContainer>
  );
}

