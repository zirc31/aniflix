import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const BaseURLofBE = process.env.REACT_APP_BE_BASEURL;
// ${BaseURLofBE}

const NewSeasonAnime = () => {
  const [animeList, setAnimeList] = useState([]);

  useEffect(() => {
  const fetchAnime = async () => {
    try {
      const response = await fetch(`${BaseURLofBE}/api/v1/fetch/get/riimuru/new-season`);
      const data = await response.json();
      setAnimeList(data.data);
    } catch (error) {
      console.error('Error fetching anime:', error);
    }
  };


    fetchAnime();
  }, []);

  if( animeList ){ 
    console.log( animeList )
  }


  return (
    <div>
      <h2 className="title-header">New Season</h2>
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

export default NewSeasonAnime; 