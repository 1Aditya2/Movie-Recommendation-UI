import React, { useRef } from "react";
import "./Searchbar.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { findMovies } from "../../Redux/Slice/recomReducer";

function Searchbar() {
  const navigate = useNavigate();
  const movie = useRef("");
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/find");
    if (movie.current.value !== "") {
      dispatch(findMovies(movie?.current?.value));
    }
  }


  
  return (
    <div className="searchbar">
      <div
        className="icon"
        onClick={() => {
          
          navigate("/");
        }}
      >
        tMDb
      </div>
      <form action="submit" className="form-search" onSubmit={handleSubmit}>
        <input
          type="search"
          className="search"
          placeholder="Search anything here..."
          ref={movie}
          
        />
      </form>
    </div>
  );
}

export default Searchbar;
