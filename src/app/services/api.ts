
import axios, { AxiosResponse } from 'axios';
import { Genre, Movie } from '../types/types';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
  }
});

// Top Rated Movies
export const getTopRatedMovies = async (page: number): Promise<Movie[]> => {
  const response: AxiosResponse<{ results: Movie[] }> = await api.get(`/movie/top_rated`, {
    params: { page,
       language: 'pt-BR',
     }
  });
  return response.data.results;
};
// Movies by id
export const getMovieById = async (movieId: number): Promise<Movie | null> => {
    try {
        const response: AxiosResponse<Movie & { genres: { id: number, name: string }[] }> = await api.get(`/movie/${movieId}`, {
            params: {
                language: 'pt-BR',
            }
        });

        const movieData = response.data;
        const adaptedMovie: Movie = {
            ...movieData,
            genre_ids: movieData.genres.map(g => g.id),
        };
        
        return adaptedMovie;

    } catch (error) {
        // Loga o erro, especialmente se for um 404 (filme não encontrado)
        console.error(`Erro ao buscar filme com ID ${movieId}:`, error);
        return null; // Retorna null em caso de falha na busca
    }
};

// Genres
export const getGenres = async (): Promise<Genre[]> => {
  const response: AxiosResponse<{ genres: Genre[] }> = await api.get('/genre/movie/list');
  return response.data.genres;
};

// Trending Movies
export const getTrendingMovies = async (page:number): Promise<Movie[]> => {
  const response: AxiosResponse<{ results: Movie[] }> = await api.get('/trending/movie/week',{
    params: { page,
      language: 'pt-BR',
     }
  });
  return response.data.results;
};



export const getMovieDetails = async (id: string): Promise<Movie> => {
  const response: AxiosResponse<Movie> = await api.get(`/movie/${id}`, {
    params: {
      language: 'pt-BR',
      append_to_response: 'videos,credits', 
    }
  });
  return response.data;
};

export default api;
