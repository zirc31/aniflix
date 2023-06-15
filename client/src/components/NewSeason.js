import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NewSeasonAnime = () => {
  const [animeList, setAnimeList] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnime();
  }, []);

  const fetchAnime = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/fetch/get/riimuru/new-season');
      const data = await response.json();
      const firstFiveAnime = data.slice(0, 5);
      setAnimeList(firstFiveAnime);
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };

  const handleMoreClick = () => {
    setShowMore(true);
    navigate('/new-season');
  };

  return (
    <div>
      <h2>New Season of Anime</h2>
      {animeList.map((anime) => (
        <div key={anime.id}>
          <h3>{anime.title}</h3>
          <p>{anime.description}</p>
        </div>
      ))}
      {!showMore && <button onClick={handleMoreClick}>MORE</button>}
    </div>
  );
};

export default NewSeasonAnime;