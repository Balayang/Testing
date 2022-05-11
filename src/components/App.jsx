import React from 'react';
import { SideBar } from './SideBar/SideBar';
import '../styles/global.css';

export const App = () => {
  const [weatherData, setWeatherData] = React.useState([]);

  const lat = '50.073658';
  const long = '14.418540';

  // const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric

  //const
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  //`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`

  //const geolocation=`lat=${position.lat}&lon=${position.long}`
  //const location = `q=${location}`

  React.useEffect(() => {
    const getWeatherData = async () => {
      const rawData = await (await fetch(API_URL)).json();
      setWeatherData(rawData);
    };
    getWeatherData();
  }, []);
  console.log(weatherData);

  return (
    <div className="container">
      <div className="leftInfo">
        <p className="temperature">27°</p>
        <div className="locationInfo">
          <h1 className="city">Prague</h1>
          <p>16:37 - Tuesday, 5 Oct. 2021</p>
        </div>
        <div className="weatherStatus">
          <img />
          <p>Clouds</p>
        </div>
      </div>
      <SideBar />
    </div>
  );
};
