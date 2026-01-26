export interface Genre {
  id: number;
  name: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface Video {
  key: string;
  site: string;
  type: string;
}

export interface Movie {
  id: number;
  title: string;
  vote_average: number;
  genre_ids: number[];
  release_date: string;
  poster_path: string;
  // Novos campos para a página de detalhes:
  overview?: string;
  runtime?: number;
  tagline?: string;
  budget?: number;
  credits?: {
    cast: CastMember[];
  };
  videos?: {
    results: Video[];
  };
}