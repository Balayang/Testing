import React from 'react';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <img src="/worldIcon.png" width="24px" height="24px" alt="Earth Icon"></img>
      <h1 className={styles.title}>My Travel Journal</h1>
    </nav>
  );
};
