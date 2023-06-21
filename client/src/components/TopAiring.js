import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BaseURLofBE = process.env.REACT_APP_BE_BASEURL;
// ${BaseURLofBE}

const TopAiring = () => {
  const [topAiring, setTopAiring] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BaseURLofBE}/api/v1/fetch/get/riimuru/top-airing`);
        const data = await response.json();
        setTopAiring(data.data);
      } catch (error) {
        console.error('Error fetching top airing data:', error);
      }
    };

    fetchData();
  }, []);

  if( topAiring ) {
    console.log(topAiring);
  }

  return (
    <div>
      <h2 className="title-header">Top Airing</h2>
      <ul className="anime-list">
        {!topAiring ? (
          <li>Loading...</li>
        ) : (
          topAiring.map((data, index) => (
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

export default TopAiring;