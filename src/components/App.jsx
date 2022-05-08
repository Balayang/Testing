import React from 'react';

import { Navbar } from './Navbar/Navbar';
import { Main } from './Main/Main';

import '../styles/normalize.css';
import '../styles/global.css';

export const App = () => {
  return (
    <div className="container">
      {' '}
      <Navbar />
      <Main/>
    </div>
  );
};
