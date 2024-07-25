import React from 'react';
import './Banner.css';
import Banner from '../assets/Banner.png';

function Banner() {
  return (
    <div className="Banner">
      <img src={Banner} alt="My Image"/>
    </div>
  );
}

export default Banner;