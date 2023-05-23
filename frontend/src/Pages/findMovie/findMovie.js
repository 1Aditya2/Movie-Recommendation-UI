import React from "react";
import "./findMovie.css";
import { useSelector } from "react-redux";
import MovieCard from "../../Components/MovieCard/MovieCard";
import { Outlet, useLocation } from "react-router-dom";

function FindMovie() {
  const foundMovies = useSelector((state) => state.recomReducer.foundMovies);
  const location = useLocation();
  const length=foundMovies.length
  console.log(foundMovies);
  return (
    <div className="findMovie">
      <div className="find">
        {(location.pathname==='/find' && length!==0)&& foundMovies?.map((movie) => (
          <MovieCard
            title={movie.title}
            poster={movie.poster_path}
            release={movie.release_date}
            rating={movie.vote_average}
            key={`${movie.id}`}
            id={movie.id}
          />
        ))}
        
        {(location.pathname==='/find' && length===0) && <p>No movies found!</p>}
      </div>
      <div className="m">
        {location.pathname!=='/find' && <Outlet/>}
      </div>
      
    </div>
  );
}

export default FindMovie;
