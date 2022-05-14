/* eslint-disable react/prop-types */
import React from 'react';

import styles from './WeatherInfo.module.css';

export const WeatherInfo = ({ temperature, name, icon, description }) => {
  return (
    <div className={styles.leftInfo}>
      <p className={styles.temperature}>{temperature}°C</p>
      <div className={styles.locationInfo}>
        <p className={styles.city}>{name}</p>
        <p>16:37 - Tuesday, 5 Oct. 2021</p>
      </div>
      <div className={styles.weatherStatus}>
        <img src={`https://openweathermap.org/img/w/${icon}.png`} alt="weatherIcon" />
        <p>{description}</p>
      </div>
    </div>
  );
};
