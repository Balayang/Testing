import React from 'react';
import { SideBar } from './SideBar/SideBar';
import '../styles/global.css';

export const App = () => {
  const [error, setError] = React.useState(false);
  const [position, setPosition] = React.useState({
    latitude: undefined,
    longitude: undefined,
  });
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
  console.log(error);

  console.log(position);
  console.log(weatherData);

  // const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric

  //const
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
        temperature: weatherData.main.temp,
        country: weatherData.sys.country,
        description: weatherData.weather[0].description,
        humidity: weatherData.main.humidity,
        wind: weatherData.wind.speed,
        feelsLike: weatherData.main.feels_like,
        icon: weatherData.weather[0].icon,
      });
    };
    getWeatherData();
  }, [position]);

  return (
    <div className="container">
      <div className="leftInfo">
        <p className="temperature">{weatherData.temperature}°</p>
        <div className="locationInfo">
          <h1 className="city">{weatherData.name}</h1>
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
