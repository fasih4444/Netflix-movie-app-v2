import React, { useEffect, useState } from "react";
import YouTube from "react-youtube";
import axios from "../axios";
import "./Row.css";
import movieTrailer from "movie-trailer";
import { Link } from "react-router-dom";

const image_base_url = "https://image.tmdb.org/t/p/original/";
let renderIt = true;

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  //we need a snippet of code which runs based on a specific condition/variable
  useEffect(() => {
    //if [], run once when the row loads, and dont run again
    //if [movies], it will run once when the row loads, and then every single time movies changes,so it is dependent on movies
    //if there is any variable pulled in from outside , we have to mention it in [], becoz useEffect is dependent on that variable,in our case it is fetchUrl
    async function fetchData() {
      //await - wait for the promise to comeback/resolve,then do something
      const request = await axios.get(fetchUrl);
       console.log(request.data.results);
      setMovies(request.data.results);
       return request;
    }
    fetchData();
  }, [fetchUrl]);
//   console.table(movies);

const opts = {
  height: "390",
  width: "100%",
  playerVars: {
    autoplay: 1
  }
};

const handleClick = (movie) => {
  //if trailer is already there and it is playing,then set to (""),remove it
  if(trailerUrl){
    setTrailerUrl('');
  }else {
    movieTrailer(movie?.name || "")
    .then((url) => {
      // https://www.youtube.com/watch?v=QZ9LMfQE5v4
      // new URL(url).search will give - ?v=QZ9LMfQE5v4
      const urlParams = new URLSearchParams(new URL(url).search);
      //URLSearchParams lets us search using get
     // urlParams.get('v'); //will give v value i.e. QZ9LMfQE5v4
     setTrailerUrl(urlParams.get('v'));
    })
    .catch((error) => console.log(error));
  }


};

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__posters">
        {movies.map((movie) => (
            //we provide for uniqueness, it helps in optimization, now if any image changes, react will not re-render full row, but just that image
          <img
            key={movie.id}
            onClick={() => handleClick(movie)}
            className="row__poster"
            src={`${image_base_url}${movie.poster_path}`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
