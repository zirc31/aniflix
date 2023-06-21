import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PopularAnime = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
    fetchPopularAnime();
  }, []);

  const fetchPopularAnime = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/fetch/get/riimuru/popular');
      const data = await response.json();
      setAnimeList(data.data);
    } catch (error) {
      console.error('Error fetching popular anime:', error);
    }
  };

  if(animeList) {
    console.log(animeList);
  }

  return (
    <div>
      <h2 className="title-header">Popular Anime</h2>
      <ul className="anime-list">
        {!animeList ? (
          <li>Loading...</li>
        ) : (
          animeList.map((data, index) => (
            <li key={index}>
              <Link to="/create-room-options">
                <img src={data.animeImg} alt={data.animeTitle} />
              </Link>
              <h3>{data.animeTitle}</h3>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default PopularAnime; 