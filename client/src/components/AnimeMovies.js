import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const AnimeMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/fetch/get/riimuru/anime-movies');
        const data = await response.json();
        setMovies(data);
      } catch (error) {
        console.error('Error fetching anime movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div>
      <h2>Popular Anime Movies</h2>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.title}</h3>
          <p>{movie.description}</p>
        </div>
      ))}
      <Link to="/anime-movies">
        <button>More</button>
      </Link>
    </div>
  );
};

export default AnimeMovies;