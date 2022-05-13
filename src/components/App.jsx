import React from 'react';
import { SideBar } from './SideBar/SideBar';
import '../styles/global.css';

export const App = () => {
  const [error, setError] = React.useState(false);

  const [weatherData, setWeatherData] = React.useState({
    name: undefined,
    temperature: undefined,
    country: undefined,
    description: undefined,
    humidity: undefined,
    wind: undefined,
    feelsLike: undefined,
    icon: undefined,
  });

  const [position, setPosition] = React.useState({
    latitude: undefined,
    longitude: undefined,
  });
  console.log(error);

  const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  //`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`

  //const geolocation=`lat=${position.lat}&lon=${position.long}`
  //const location = `q=${location}`

  React.useEffect(() => {
    if (!navigator.geolocation) {
      console.Error('Browser do not support geolocation!');
      setError(true);
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        error => {
          console.error('Getting geolocation failed', error);
          setError(true);
        }
      );
    }
  }, []);

  React.useEffect(() => {
    const getWeatherData = async () => {
      const rawData = await (await fetch(API_URL)).json();
      setWeatherData({
        name: rawData.name,
        temperature: Math.round(rawData.main.temp),
        country: rawData.sys.country,
        description: rawData.weather[0].description,
        humidity: rawData.main.humidity,
        wind: rawData.wind.speed,
        feelsLike: rawData.main.feels_like,
        icon: rawData.weather[0].icon,
      });
    };
    if (position) {
      getWeatherData(position);
    }
  }, [position]);

  return (
    <div className="container">
      <div className="errorElement">
        <p>Error Message</p>
      </div>
      <div className="leftInfo">
        <p className="temperature">{weatherData.temperature}°C</p>
        <div className="locationInfo">
          <p className="city">{weatherData.name}</p>
          <p>16:37 - Tuesday, 5 Oct. 2021</p>
        </div>
        <div className="weatherStatus">
          <img src={`https://openweathermap.org/img/w/${weatherData.icon}.png`} alt="weatherIcon" />
          <p>{weatherData.description}</p>
        </div>
      </div>
      <SideBar />
    </div>
  );
};
