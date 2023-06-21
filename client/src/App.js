import React from 'react';
import { useState, useEffect, createContext } from 'react';
import {  Routes, Route } from 'react-router-dom';
import './App.css';
// import Homepage from './pages/Homepage';
import ChatRoom from './pages/ChatRoom';
import CreateRoomOptions from './pages/CreateRoomOptions';
import Room from './pages/Room';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import UserProfile from './pages/UserProfile';
import Logout from './components/Logout';
import CreateRoom from './pages/CreateRoom';
import TempSetRoomId from './components/TempSetRoomId';


export const AppContext = createContext();

const App = () => {

  const [ isTokenExist, setIsTokenExist  ] = useState(false);

  // check if user have token or is logged in.
  useEffect(() => {
    if( localStorage.getItem("token") === null ) {
    } else {
        setIsTokenExist(true);
    }
  },[]);

  return (
    <AppContext.Provider value={{ isTokenExist, setIsTokenExist }}>
      <div className="App">
        <Routes>
          <Route path='/' element={<Frontpage /> } />
          <Route path='/chatroom' element={<ChatRoom /> } />
          <Route path='/create-room-options' element={<CreateRoomOptions /> } />  
          <Route path='/room' element={<Room /> } />  
          <Route path='/login-page' element={<LoginPage /> } />  
          <Route path='/user-page' element={<UserPage /> } />  
          <Route path='/user-profile' element={<UserProfile /> } />  
          <Route path='/logout' element={<Logout /> } />  
          <Route path='/create-room' element={<CreateRoom /> } />  
          <Route path='/set-room-id' element={<TempSetRoomId /> } />
        </Routes>
      </div>
    </AppContext.Provider>
  )
}

export default App

