import React from 'react';
import './Banner.css';
import Banner from '../assets/Banner.png';
import Team from '../assets/Team.png';

function Banner() {
  return (
    <div className="Banner">
      <div>
        <img src={Team} alt="Team" id="team"/>
      </div>
    </div>
  );
}

export default Banner;