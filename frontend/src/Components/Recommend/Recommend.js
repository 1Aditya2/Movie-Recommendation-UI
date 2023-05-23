import React, { useEffect } from "react";
import "./Recommend.css";
import { useDispatch, useSelector } from "react-redux";

import MovieCard from "../MovieCard/MovieCard";
import { getRecommendedMovies } from "../../Redux/Slice/recomReducer";

function Recommend() {
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.recomReducer.movies);
  const moviesUpdated = useSelector(
    (state) => state.recomReducer.moviesUpdated
  );

  useEffect(() => {
    dispatch(
      getRecommendedMovies({
        movie: JSON.parse(localStorage.getItem("history")),
      })
    );
  }, [dispatch]);

  return (
    <div className="main">
      <div className="heading">
        <h1>Recommended Movies Based On Past Searches!</h1>
        {moviesUpdated === false && (
          <p style={{fontStyle:'italic'}}>You haven't searched or this movie has no recommendations</p>
        )}
      </div>

      <div className="recommend">
        {allMovies &&
          allMovies?.map((movie) => (
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
    </div>
  );
}

export default Recommend;
