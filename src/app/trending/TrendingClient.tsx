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

export default function TrendingClient() {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [TopMovies, setTopMovies] = useState<Movie[]>([]);
  const [TrendingTopRatedMovies, setTrendingTopRatedMovies] = useState<Movie[]>([]);
  const [TrendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showMovies, setShowMovies] = useState(false);
  const [loading, setLoading] = useState(false);

  // Estado que controla qual lista está sendo mostrada
  const [currentFilter, setCurrentFilter] = useState<'trending' | 'topRated'>('trending');

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

      //trending movies geral
      setTrendingMovies(uniqueTrending);
    

      // Filmes que estão em ambas as listas (topRated e trending)
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

  // Funções para trocar o filtro exibido
  const showTrendingMovies = () => {
    setCurrentFilter('trending');
  };

  const showTopRatedMovies = () => {
    setCurrentFilter('topRated');
  };

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
        <Trending darkMode={darkMode}>
          <section className="cadastro-1-movies">
            <h1 >Trending Filmes</h1>
            {/* Botões para alternar as listas */}
            <div className='filters' style={{ marginBottom: '15px' }}>
              <button onClick={showTrendingMovies} disabled={currentFilter === 'trending'}>
                Trending Movies
              </button>
              <button onClick={showTopRatedMovies} disabled={currentFilter === 'topRated'} style={{ marginLeft: '10px' }}>
                Top Rated Trending 
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
                  <ul className='lista'>
                    {(currentFilter === 'trending' ? TrendingMovies : TrendingTopRatedMovies).map((movie) => (
                      <div key={movie.id} className='card-trending'>
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
              </>
            )}
          </section>
        </Trending>
      </div>
    </PageContainer>
  );
}
