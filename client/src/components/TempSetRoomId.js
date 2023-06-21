import React from 'react';

const TempSetRoomId = () => {

  // enable for testing via params.
  const queryParams = new URLSearchParams(window.location.search);
  const queryRoomId = queryParams.get("roomId");

  localStorage.setItem('aniflix_roomId', queryRoomId);

  const localRoomId = localStorage.getItem("aniflix_roomId");

  console.log(localRoomId);

  return (
    <>
    </>
  );
};

export default TempSetRoomId;
