/* eslint-disable react/prop-types */
import React from 'react';
import classNames from 'classnames/bind';
import styles from './Die.module.css';

const cx = classNames.bind(styles);

export const Die = ({ value, isHeld, holdDice }) => {
  return (
    <div onClick={holdDice} className={cx('die', isHeld ? 'green' : '')}>
      <h2>{value}</h2>
    </div>
  );
};
