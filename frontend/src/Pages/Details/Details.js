import React, { useEffect } from "react";
import "./Details.css";
import { useDispatch, useSelector } from "react-redux";
import { getDetails } from "../../Redux/Slice/recomReducer";
function Details() {
  const path = window.location.pathname;
  console.log(path,'path at details');
  let matches = path.match(/(\d+)/);
  console.log(matches[0]);
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.recomReducer.movieDetails);
  useEffect(() => {
    dispatch(getDetails(matches[0]));
  }, [dispatch]);
  let rating=movieDetails?.vote_average?.toString()
  rating=rating?.slice(0,3)
  // console.log(rating);
  return (
    <div className="movieDetails">
      <div className="poster">
        <img
          src={`https://image.tmdb.org/t/p/w300/${movieDetails.poster_path}`}
          alt=""
        />
      </div>
      <div className="content">
        <div className="top">
          <div className="titlenrating">
            <div className="title">
              <h3 style={{fontSize:'25px'}}>{movieDetails.title}</h3>
              <div className="runrel">
                <p>{movieDetails.release_date}</p>
                <p>|</p>
                <p>{movieDetails.runtime}min</p>
                <p>|</p>
                <p>{movieDetails.original_language}</p>
              </div>
            </div>
            <div className="rate">
            <i className="fa-solid fa-star"></i>{rating}/10
            </div>
          </div>
          <div className="overview">
            {movieDetails.overview}
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="genres">
            Genres:&nbsp;&nbsp;&nbsp;<span>{movieDetails?.genres?.map(genre=>{ return `${genre.name} `})}</span>
            
          </div>
          <div className="languages">
          Spoken Languages:&nbsp;&nbsp;&nbsp;<span>{movieDetails?.spoken_languages?.map(lang=>{ return `${lang.english_name} `})}</span>
          </div>
          <div className="country">
          Country:&nbsp;&nbsp;&nbsp;<span>{movieDetails?.production_countries?.map(cont=>{ return `${cont.name} `})}</span>
          </div>
          <div className="companies">
          Production Companies:&nbsp;&nbsp;&nbsp;<span>{movieDetails?.production_companies?.map(comp=>{ return `${comp.name} `})}</span>
          </div>
          <div className="status">
            Status:&nbsp;&nbsp;&nbsp;<span>{movieDetails.status}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
