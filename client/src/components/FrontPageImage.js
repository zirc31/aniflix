import React from 'react';
import '../styles/frontpage.css';

const frontpageImage = () => {
    const frontBackground = require('../images/frontBackground.png');

    return(
        <div className="frontpage-container">
        <img src={ frontBackground } />
  
        <div className="buttons-container">
          <button className="signin-button">Sign In</button>
          <button className="signup-button">Sign Up</button>
        </div>
      </div>
    )
}

export default frontpageImage;