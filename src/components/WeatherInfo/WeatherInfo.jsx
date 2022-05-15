/* eslint-disable react/prop-types */
import React from 'react';

import styles from './WeatherInfo.module.css';

export const WeatherInfo = ({ temperature, name, icon, description }) => {
  const [date, setDate] = React.useState('Loading Date...');

  React.useEffect(() => {
    const options = {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    const today = new Date();
    console.log(today);
    return setDate(today.toLocaleDateString('en-US', options));
  }, [date]);

  return (
    <section className={styles.leftInfo}>
      <p className={styles.temperature}>{temperature}°C</p>
      <div className={styles.locationInfo}>
        <p className={styles.city}>{name}</p>
        <p className={styles.date}>{date}</p>
      </div>
      <div className={styles.weatherStatus}>
        <img
          className={styles.weatherIcon}
          src={`https://openweathermap.org/img/w/${icon}.png`}
          alt="weatherIcon"
        />
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};
