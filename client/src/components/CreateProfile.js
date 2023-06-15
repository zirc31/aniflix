import React from 'react';

const CreateProfile = () => {
  const createProfile = require('../images/createProfile.png');

  return (
    <div className="createProfile-container">
      <h2 className="createProfile-header">Create Profile
      <p className="createProfile-paragraph">
        Customize your profile, connect with fellow anime fans, and join engaging discussions.
      </p></h2>
      <div className="createProfile-image">
        <img className="createProfile" src={createProfile} alt="profile" />
      </div>
    </div>
  );
};

export default CreateProfile;