"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { PageContainer } from "@/app/components/PageContainer";
import { SidebarComponent } from "@/app/components/sidebar";
import { NavbarComponent } from "@/app/components/Navbar";
import { ThemeContext } from "@/app/components/ThemeContext/ThemeContext";
import { getMovieDetails } from "@/app/services/api";
import { Movie } from "@/app/types/types";
import { formatDate } from "@/app/trending/FormatDate";
import { MdOutlineStar, MdOutlineTimer, MdCalendarMonth, MdPlayCircleOutline } from "react-icons/md";
import "./styles.css";

export default function MovieDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const [movie, setMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  const themeContext = useContext(ThemeContext);
  if (!themeContext) throw new Error("useContext must be used within a ThemeProvider");
  const { darkMode } = themeContext;

  useEffect(() => {
    if (!id) return;
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await getMovieDetails(id);
        setMovie(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <PageContainer padding="0px" darkMode={darkMode} display="flex">
        <div className={`movie-topShell ${darkMode ? "dark" : "light"}`}>
          <div className="movie-shell">
            <aside className="trd-sidebar">
              <SidebarComponent />
            </aside>
            <main className="movie-main" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex' }}>
              <div className="trd-loaderDot" />
            </main>
          </div>
        </div>
      </PageContainer>
    );
  }

  if (!movie) return null;

  const trailer = movie.videos?.results.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (

      <div className="movie-topShell">
        <div className="movie-shell">
          <aside className="trd-sidebar">
            <div className="trd-desktopOnly">
              <SidebarComponent />
            </div>
          </aside>

          <main className="movie-main">
            <div className="trd-mobileOnly">
              <NavbarComponent />
            </div>

            <div className="movie-glassCard">
              <header className="movie-header">
                <h1 className="movie-title">{movie.title}</h1>
                <div className="movie-pills">
                  <span className="movie-pill">
                    <MdOutlineStar style={{ color: '#f5c518' }} /> {movie.vote_average?.toFixed(1)}
                  </span>
                  <span className="movie-pill">
                    <MdOutlineTimer /> {movie.runtime} min
                  </span>
                  <span className="movie-pill">
                    <MdCalendarMonth /> {formatDate(movie.release_date)}
                  </span>
                </div>
              </header>

              <div className="movie-contentGrid">
                <div className="movie-posterCol">
                  <img 
                    src={movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : ""} 
                    className="movie-poster" 
                    alt={movie.title} 
                  />
                </div>

                <div className="movie-infoCol">
                  <h2 className="movie-sectionTitle">Sinopse</h2>
                  <p className="movie-overview">
                    {movie.overview || "Sinopse não disponível para este filme."}
                  </p>

                  <h2 className="movie-sectionTitle">Elenco Principal</h2>
                  <div className="movie-castList">
                    {movie.credits?.cast.slice(0, 10).map((actor) => (
                      <div key={actor.id} className="movie-actorCard">
                        <div className="movie-actorImageWrap">
                          <img 
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/185x185?text=N/A"} 
                            className="movie-actorThumb" 
                            alt={actor.name}
                          />
                        </div>
                        <div className="movie-actorInfo">
                           <span className="movie-actorName">{actor.name}</span>
                           <span className="movie-actorChar">{actor.character}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {trailer && (
                <section className="movie-trailerSection">
                  <h2 className="movie-sectionTitle">
                    <MdPlayCircleOutline className="movie-icon-red" /> Trailer Oficial
                  </h2>
                  <div className="movie-trailerContainer">
                    <iframe 
                      src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1`} 
                      title={`${movie.title} Trailer`}
                      frameBorder="0" 
                      allowFullScreen 
                    />
                  </div>
                </section>
              )}
            </div>
          </main>
        </div>
      </div>
  );
}