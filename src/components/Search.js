import React, { useEffect, useState } from "react";
import Movie from "./Movie";
import axios from "../axios";
import requests from "../requests";

const searchApi = requests.movieSearch;
const mList = requests.fetchMovie;

function Search() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(mList);
  }, []);

  const getMovies = (url) => {
    async function fetchData() {
      const request = await axios.get(url);
      //console.log(request.data.results);
      console.log(axios.get(url));
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  };

  // FOR SEARCHING

  const [searchTerm, setSearchTerm] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (searchTerm) {
      getMovies(searchApi + searchTerm);
      setSearchTerm("");
    }
  };

  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="search__container">
      <header>
        <form onSubmit={handleOnSubmit}>
          <input
            type="text"
            className="search"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleOnChange}
          />
        </form>
      </header>
      <div className="movie-container">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} {...movie} />)}
        {/* {movies.length > 0 && movies.map(movie => 
            //see console , in which there is results array, movie is a element of that array
            //spread to get all the props separately
            <Movie key={movie.id} {...movie}/>
          )} */}
      </div>
    </div>
  );
}

export default Search;
