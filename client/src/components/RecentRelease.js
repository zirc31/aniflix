import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const RecentReleases = () => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetchReleases = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/v1/fetch/get/riimuru/recent-release');
        const data = await response.json();
        setReleases(data);
      } catch (error) {
        console.error('Error fetching recent releases:', error);
      }
    };

    fetchReleases();
  }, []);

  return (
    <div>
      <h2>Recent Releases</h2>
      <ul>
        {releases.slice(0, 5).map((release) => (
          <li key={release.id}>{release.title}</li>
        ))}
      </ul>
      <Link to="/recent-release">
        <button>More</button>
      </Link>
    </div>
  );
};

export default RecentReleases;