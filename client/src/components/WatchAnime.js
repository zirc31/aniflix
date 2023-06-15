import React from 'react';

const WatchAnime = () => {
  const watchAnime = require('../images/watchAnime.mp4');

  return (
    <div className="watchAnime-container">
      <h2 className="watchAnime-header">Stream Anime
      <p className="watchAnime-paragraph">
        Watch your favorite anime on time with our daily updates and enjoy!
      </p></h2>
      <div className="watchAnime-video">
        <video className="watchAnime" autoPlay muted loop>
          <source src={watchAnime} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default WatchAnime;