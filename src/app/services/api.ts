
import axios, { AxiosResponse } from 'axios';
import { Genre, Movie } from '../types/types';

const api = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  params: {
    api_key: process.env.NEXT_PUBLIC_TMDB_API_KEY, 
  }
});

// Top Rated Movies
export const getTopRatedMovies = async (page: number): Promise<Movie[]> => {
  const response: AxiosResponse<{ results: Movie[] }> = await api.get(`/movie/top_rated`, {
    params: { page }
  });
  return response.data.results;
};

// Genres
export const getGenres = async (): Promise<Genre[]> => {
  const response: AxiosResponse<{ genres: Genre[] }> = await api.get('/genre/movie/list');
  return response.data.genres;
};

// Trending Movies
export const getTrendingMovies = async (): Promise<Movie[]> => {
  const response: AxiosResponse<{ results: Movie[] }> = await api.get('/trending/movie/week');
  return response.data.results;
};

export default api;
