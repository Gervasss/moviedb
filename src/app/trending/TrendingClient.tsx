"use client";
import { useContext, useEffect, useState } from 'react';
import { PageContainer } from '../components/PageContainer';
import { SidebarComponent } from '../components/sidebar';
import './styles.css';
import { ThemeContext } from "../components/ThemeContext/ThemeContext";
import { Spinner, Trending } from './styles';
import { getTrendingMovies, getGenres, getTopRatedMovies } from '../services/api';
import { Genre, Movie } from '../types/types';

export default function TrendingClient() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [TopMovies, setTopMovies] = useState<Movie[]>([]);
  const [totalMovies, setTotalMovies] = useState<number>(0);
  const [TrendingTopRatedMovies, setTrendingTopRatedMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showMovies, setShowMovies] = useState(false);
  const [loading, setLoading] = useState(false);


  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useContext must be used within a ThemeProvider");
  }
  const { darkMode } = themeContext;

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

      // Verifica quais dos top-rated  estao nos trending
      const intersection = uniqueTrending.filter(movie =>
        topRatedMovies.some(topMovie => topMovie.id === movie.id)
      );

      setTotalMovies(intersection.length);
      setTrendingTopRatedMovies(intersection);

      if (intersection.length > 0) {
        setShowMovies(true);
      } else {
        setMessage("Nenhum filme no trending");
      }
    };

    setTimeout(() => {
      setLoading(false);
    }, 300);

    fetchData();
  }, []);

  const formatDate = (date: string): string => {
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
      {loading && (
              <div className="modal-overlay">
                <Spinner />
              </div>
            )}
            {!loading && (
        <>
      <div style={{ height: "90%", width: "94.8%", marginTop: "10px", marginLeft: "10px" }}>
        <SidebarComponent />
      </div>
      <div className="content-1">
        <Trending darkMode={darkMode}>
          <section className="cadastro-1-movies">
            <h1 style={{ marginLeft: "1%" }}>Trending Filmes </h1>
            <h5> {totalMovies} Filmes </h5>
            {showMovies ? (
              <ul className='lista'>
                {TrendingTopRatedMovies.map((movie) => (
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
                      <p className='lancamento'>Lançamento: {formatDate(movie.release_date)}</p>
                    </div>
                  </div>
                ))}
              </ul>
            ) : (
              <p>{message}</p>
            )}
          </section>
        </Trending>
      </div>
      </>
      )}
    </PageContainer>
  );
}
