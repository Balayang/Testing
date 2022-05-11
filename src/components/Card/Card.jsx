/* eslint-disable react/prop-types */
import React from 'react';

import styles from './Card.module.css';

export const Card = ({ locationImg, location, country, googleMaps, journeyDate, description }) => {
  return (
    <section className={styles.card}>
      <img
        className={styles.locationImg}
        src={locationImg}
        width="125px"
        height="168px"
        alt={`${location}, ${country} Image`}
      ></img>
      <div className={styles.cardText}>
        <div className={styles.locationInfo}>
          <img src="/locationIcon.png" width="7px" height="10px" alt="Location Icon"></img>
          <p className={styles.country}>{country}</p>
          <a href={googleMaps} target="_blank" rel="noreferrer" className={styles.googleMaps}>
            View on Google Maps
          </a>
        </div>
        <h2 className={styles.location}>{location}</h2>
        <p className={styles.journeyDate}>{journeyDate}</p>
        <p className={styles.description}>{description}</p>
      </div>
    </section>
  );
};
