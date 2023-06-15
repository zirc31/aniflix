import React from 'react';
import '../styles/FrontpageStyles.css';
import WatchAnime from '../components/WatchAnime';
import WatchChat from '../components/WatchChat';
import CreateProfile from '../components/CreateProfile';
import Header from '../components/Header';
import RecentRelease from '../components/RecentRelease';
import NewSeason from '../components/NewSeason';
import Popular from '../components/Popular';
import AnimeMovies from '../components/AnimeMovies';
import TopAiring from '../components/TopAiring';
import FAQ from '../components/FAQ';
import frontBackground from '../images/frontBackground.mp4';


const Frontpage = () => {
  return (
    <div className="frontpage-container">
      <div className="video-container">
        <video className="background-video" autoPlay muted loop>
          <source src={frontBackground} type="video/mp4" />
        </video>

        <Header />

        <WatchAnime />
        <WatchChat />
        <CreateProfile />

        <RecentRelease />
        <NewSeason />
        <Popular />
        <AnimeMovies />
        <TopAiring />

        <FAQ />
      </div>
    </div>
  );
};

export default Frontpage;