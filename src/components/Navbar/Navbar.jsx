import React from 'react';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img className={styles.logo} src="./logo.png" width="179px" height="26px" alt="logo" />
    </nav>
  );
};
