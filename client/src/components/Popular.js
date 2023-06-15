import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PopularAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPopularAnime();
  }, []);

  const fetchPopularAnime = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/fetch/get/riimuru/popular');
      const data = await response.json();
      const firstFiveAnime = data.slice(0, 5);
      setAnimeList(firstFiveAnime);
    } catch (error) {
      console.error('Error fetching popular anime:', error);
    }
  };

  const handleMoreClick = () => {
    navigate('/popular');
  };

  return (
    <div>
      <h2>Popular Anime</h2>
      {animeList.map((anime) => (
        <div key={anime.id}>
          <h3>{anime.title}</h3>
          <p>{anime.description}</p>
        </div>
      ))}
      <button onClick={handleMoreClick}>
        <Link to="/popular">MORE</Link>
      </button>
    </div>
  );
};

export default PopularAnime;