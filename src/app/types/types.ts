export interface Movie {
    id: number;
    title: string;
    vote_average: number;
    genre_ids: number[];
    release_date: string;
    poster_path: string;
  }
  
  export interface Genre {
    id: number;
    name: string;
    poster_path: string;
  }