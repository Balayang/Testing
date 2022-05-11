//TIPS FOR IMPROOVEMENT
//automated pics, country, googlelink - dont forget to set up default values and pics if no data
// capitalize via JS
// date maybe JS formating
// responsivity
// correct units

import React from 'react';

import { Navbar } from './Navbar/Navbar';
import { Card } from './Card/Card';
import data from '../data/data';

import '../styles/normalize.css';
import '../styles/global.css';

export const App = () => {
  const [geoData, setGeoData] = React.useState();
  const API_KEY = 'AIzaSyChqw7zgeHo-CBjs4AnLPA2aTMbHb17gr0';
  const API_URL = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places&callback=initMap`;

  React.useEffect(() => {
    const getData = async () => {
      const data = await (await fetch(API_URL)).json();
      setGeoData(data);
    };
    getData();
  }, []);

  console.log(geoData);

  const journeyElement = data.map(card => {
    return (
      <Card
        key={card.id}
        locationImg={`image${card.id}.png`}
        country={card.country}
        googleMaps={card.googleMaps}
        location={card.location}
        journeyDate={card.journeyDate}
        description={card.description}
      />
    );
  });

  return (
    <div className="container">
      <Navbar />
      <div className="myJourneys">{journeyElement}</div>
    </div>
  );
};
