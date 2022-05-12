/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames/bind';

import styles from './SideBar.module.css';

const cx = classNames.bind(styles);

export const SideBar = ({ country, humidity, wind, feelsLike }) => {
  return (
    <aside className={styles.sideBar}>
      <div className={styles.sidebarContainer}>
        <form autoComplete="off" className={styles.sideBarForm}>
          <input className={styles.locationInput} type="text" placeholder="Enter Location.." />
          <button></button>
        </form>

        <div className={styles.spacer}></div>

        <ul className={styles.cities}>
          <li>
            <p className={styles.city}>Tel Aviv</p>
          </li>
          <li>
            <p className={styles.city}>New York</p>
          </li>
          <li>
            <p className={styles.city}>Tokyo</p>
          </li>
          <li>
            <p className={styles.city}>Paris</p>
          </li>
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
      </div>
    </aside>
  );
};