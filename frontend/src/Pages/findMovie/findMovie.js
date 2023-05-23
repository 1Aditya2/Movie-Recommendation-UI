import React from "react";
import "./findMovie.css";
import { useSelector } from "react-redux";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { Outlet, useLocation } from "react-router-dom";

function FindMovie() {
  const foundMovies = useSelector((state) => state.recomReducer.foundMovies);
  const location = useLocation();
  
  return (
    <div className="findMovie">
      <div className="find">
        {location.pathname==='/find' && foundMovies?.map((movie) => (
          <MovieCard
            title={movie.title}
            poster={movie.poster_path}
            release={movie.release_date}
            rating={movie.vote_average}
            key={`${movie.id}`}
            id={movie.id}
          />
        ))}
      </div>
      <div className="m">
        {location.pathname!=='/find' && <Outlet/>}
      </div>
      
    </div>
  );
}

export default FindMovie;
