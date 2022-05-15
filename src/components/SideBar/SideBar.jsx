/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames/bind';

import styles from './SideBar.module.css';

const cx = classNames.bind(styles);

export const SideBar = ({ country, humidity, wind, feelsLike, setLocation }) => {
  const searchCity = e => {
    if (e.target.value !== '') {
      setLocation(e.target.value);
      console.log(location);
    } else {
      setLocation(undefined);
    }
  };

  const citiesList = ['New York', 'Paris', 'Tokio'];

  const cityElement = citiesList.map(city => {
    return (
      <li key={city}>
        <p className={styles.city} onClick={() => setLocation(city)}>
          {city}
        </p>
      </li>
    );
  });

  return (
    <aside className={styles.sideBar}>
      <input
        className={cx(styles.locationInput)}
        type="text"
        placeholder="Enter Location.."
        onChange={searchCity}
      />

      <div className={styles.spacer}></div>

      <ul className={styles.cities}>
        <li>
          <p className={styles.city} onClick={() => setLocation('')}>
            My Location
          </p>
        </li>
        {cityElement}
      </ul>

      <div className={styles.spacer}></div>

      <h4 className={cx('weatherDetails', 'white')}>Weather Details</h4>
      <ul className={styles.statusList}>
        <li>
          <p>Country</p>
          <p className={cx('country', 'white')}>{country}</p>
        </li>
        <li>
          <p>Humidity</p>
          <p className={cx('humidity', 'white')}>{humidity}%</p>
        </li>
        <li>
          <p>Wind</p>
          <p className={styles.white}>{wind}km/h</p>
        </li>
        <li>
          <p>Feels Like</p>
          <p className={cx('feelsLike', 'white')}>{feelsLike}°C</p>
        </li>
      </ul>

      <div className={styles.spacer}></div>
    </aside>
  );
};
