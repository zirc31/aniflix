import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BaseURLofBE = process.env.REACT_APP_BE_BASEURL;
// ${BaseURLofBE}

const RecentReleases = () => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch(`${BaseURLofBE}/api/v1/fetch/get/riimuru/recent-release`);
        const data = await response.json();
        setReleases(data.data);
      } catch (error) {
        console.error('Error fetching recent releases:', error);
      }
    };

    fetchReleases();
  }, []);

  return (
    <div>
      <h2 className="title-header">Recent Releases</h2>
      <ul className="anime-list">
        {!releases ? (
          <li>Loading...</li>
        ) : (
          releases.map((data, index) => (
            <li key={index}>
              <Link to="/create-room-options">
                <img src={data.animeImg} alt={data.animeTitle} />
              </Link>
              <h3>{data.animeTitle}</h3>
              <p>Episode: {data.episodeNum}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RecentReleases;