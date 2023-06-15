import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopAiring = () => {
  const [topAiring, setTopAiring] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/fetch/get/riimuru/top-airing');
        const data = await response.json();
        setTopAiring(data);
      } catch (error) {
        console.error('Error fetching top airing data:', error);
      }
    };

    fetchData();
  }, []);

  const handleMoreClick = () => {
    navigate('/top-airing');
  };

  return (
    <div>
      <h1>Top Airing Shows</h1>
      <ul>
        {topAiring.map(show => (
          <li key={show.id}>{show.title}</li>
        ))}
      </ul>
      <button onClick={handleMoreClick}>More</button>
    </div>
  );
};

export default TopAiring;