import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BaseURLofBE = process.env.REACT_APP_BE_BASEURL;
// ${BaseURLofBE}

const AnimeMovies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(`${BaseURLofBE}/api/v1/fetch/get/riimuru/anime-movies`);
        const data = await response.json();
        setMovies(data.data);
      } catch (error) {
        console.error('Error fetching anime movies:', error);
      }
    };

    fetchMovies();
  }, []);

  if( movies ){
    console.log(movies);
  }

  return (
    <div>
      <h2 className="title-header">Anime Movies</h2>
      <ul className="anime-list">
        {!movies ? (
          <li>Loading...</li>
        ) : (
          movies.map((data, index) => (
            <li key={index}>
              <Link to="/create-room-options">
                <img src={data.animeImg} alt={data.animeTitle} />
              </Link>
              <h3>{data.animeTitle}</h3>
              <p>Released Date: {data.releasedDate}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default AnimeMovies;