import React from 'react';

const WatchChat = () => {
  const watchChat = require('../images/watchChat.mp4');

  return (
    <div className="watchchat-container">
      <div className="watchChat-video">
        <video className="watchChat" autoPlay muted loop>
          <source src={watchChat} type="video/mp4" />
        </video>
      </div>
      <div className="watchchat-text">
        <h2 className="watchchat-header">Watch & Chat</h2>
        <p className="watchchat-paragraph">
          Enjoy watching anime with your groups while messaging each other about your reactions to the awesome scenes.
        </p>
      </div>
    </div>
  );
};

export default WatchChat;