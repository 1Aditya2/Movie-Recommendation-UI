import React from 'react'
import './MovieCard.css'
import {useNavigate} from 'react-router-dom'
function MovieCard(props) {
    
    const navigate=useNavigate()
    let rate=props.rating.toString()
    rate=rate.slice(0,3)
   
  return (
    <div className='Moviecard'>
        <div className="moviePoster" onClick={()=>{navigate(`${props.id}`)}}>
            <img src={`https://image.tmdb.org/t/p/w300/${props.poster}`} className='image' alt='' style={{textAlign:'center',color:'white'}}/>
        </div>
        <div className="details" style={{color:'white'}}>
            <div className="title">
                {props.title}
            </div>
          
            <div className="rndr">
                <div className="rating">
                <i className="fa-solid fa-star"></i>{rate}
                </div>
                
                <div className="rating">
                <i className="fa-solid fa-calendar"></i>{props.release}
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default MovieCard