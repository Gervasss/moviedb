"use client";

import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import './styles.css';;
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { getTopRatedMovies, getGenres } from '../services/api';
import { Genre, Movie } from '../types/types';
import { Generos } from './styles';
import { NavbarComponent } from '../components/Navbar';





export  default function GenerosClient() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [genreAverages, setGenreAverages] = useState<{ [key: string]: number }>({});
  const [genreMovies, setGenreMovies] = useState<{ [key: string]: number }>({});
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

      const storedGenres = localStorage.getItem('Genres');
      if (storedGenres) {
        setGenres(JSON.parse(storedGenres));
      } else{
        const genresList = await getGenres();
        setGenres(genresList);
        localStorage.setItem('Genres', JSON.stringify(genresList));
      }
    };
    setTimeout(() => {
      setLoading(false);
    }, 300);
    fetchData();
  }, []);


    
    const calculateGenreAverages = () :void=> {
        const averages: { [key: string]: number } = {};
        genres.forEach((genre) => {
          const relatedMovies = movies.filter((movie) => movie.genre_ids.includes(genre.id));
          if (relatedMovies.length > 0) {
            const totalRating = relatedMovies.reduce((acc, movie) => acc + movie.vote_average, 0);
            averages[genre.name] = totalRating / relatedMovies.length;
          } else {
            averages[genre.name] = 0; 
          }
        });
    
         setGenreAverages(averages);
      };

    
      
      const calculateGenreMovies= () :void=> {
        const genreMovies: { [key: string]: number } = {};
        genres.forEach((genre) => {
          const relatedMovies = movies.filter((movie) => movie.genre_ids.includes(genre.id));
          if (relatedMovies.length > 0) {
            const totalMovies = relatedMovies.length;
            genreMovies[genre.name] = totalMovies ;
          } else {
            genreMovies[genre.name] = 0; 
          }
        });
    
         setGenreMovies(genreMovies);
      };

      useEffect(() => {
        if(genres.length > 0) {
            calculateGenreAverages();
            calculateGenreMovies();
        }
        
      },[movies,genres]);
      
    
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
        <Generos darkMode={darkMode}>
          <section className="cadastro-1-movies">
            <h1 >Gêneros</h1>
            {loading && (
              <div className="modal-overlay">
                <h3>Carregando...</h3>
              </div>
            )}
            {!loading && (
            <>
            {genres.length > 0 ? (
              <ul className='lista-genero'>
                {genres.map((genre) => (
                  <div key={genre.id} className='card'>
                    <div>
                      <h3 className='genero'>{genre.name}</h3>
                      <p>Média : {genreAverages[genre.name]?.toFixed(2)} </p>
                      <p>Total: {genreMovies[genre.name]} </p>
                    </div>
                  </div>
                ))}
              </ul>
            ) : <p>Genêros não encontrados</p>}
               </>
              )}
          </section>
        </Generos>
      </div>
     
    </PageContainer>
  );
}
