import React from "react"
import {Link} from "react-router-dom"

const MovieDetail = (props) => {
    return (
        <>
            <h1>aaaaaa</h1>
            <h1>{props.movie.title}</h1>
            <img src={"https://image.tmdb.org/t/p/w185" + props.movie.poster_path} alt=""/>
              <p>{props.movie.overview}</p>
            <Link></Link>
        </>
    )
}



export default MovieDetail