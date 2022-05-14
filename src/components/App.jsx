import React from 'react';
import { SideBar } from './SideBar/SideBar';
import { WeatherInfo } from './WeatherInfo/WeatherInfo';
import '../styles/global.css';

export const App = () => {
  const [status, setStatus] = React.useState('LOADING');
  const [position, setPosition] = React.useState(undefined);
  const [errorMessage, setErrorMessage] = React.useState(undefined);
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

  const getApiUrl = position =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

  //`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`

  //const geolocation=`lat=${position.lat}&lon=${position.long}`
  //const location = `q=${location}`

  React.useEffect(() => {
    if (!navigator.geolocation) {
      console.Error('Browser do not support geolocation!');
      setStatus('ERROR');
    } else {
      navigator.geolocation.getCurrentPosition(
        position => {
          setPosition({ latitude: position.coords.latitude, longitude: position.coords.longitude });
        },
        error => {
          console.error('Getting geolocation failed', error);
          setStatus('ERROR');
          setErrorMessage(error.message.toUpperCase());
        }
      );
    }
  }, []);

  React.useEffect(() => {
    const getWeatherData = async () => {
      const rawData = await (await fetch(getApiUrl(position))).json();
      setWeatherData({
        name: rawData.name,
        temperature: Math.round(rawData.main.temp),
        country: rawData.sys.country,
        description: rawData.weather[0].description,
        humidity: rawData.main.humidity,
        wind: rawData.wind.speed,
        feelsLike: Math.round(rawData.main.feels_like),
        icon: rawData.weather[0].icon,
      });
    };
    if (position) {
      getWeatherData(position);
    }
  }, [position]);

  React.useEffect(() => {
    if (weatherData && position) {
      setStatus('SUCCESS');
    }
  }, [weatherData]);

  const renderApp = status => {
    switch (status) {
      case 'SUCCESS':
        return (
          <>
            <WeatherInfo
              name={weatherData.name}
              temperature={weatherData.temperature}
              icon={weatherData.icon}
              description={weatherData.description}
            />
            <SideBar
              country={weatherData.country}
              humidity={weatherData.humidity}
              wind={weatherData.wind}
              feelsLike={weatherData.feelsLike}
            />
          </>
        );
      case 'ERROR':
        return (
          <div className="messageContainer">
            <h1 className="message">{errorMessage}</h1>
          </div>
        );
      case 'LOADING':
        return (
          <div className="messageContainer">
            <h1 className="message">LOADING...</h1>
          </div>
        );

      default:
        return (
          <div className="messageContainer">
            <h1 className="message">LOADING...</h1>
          </div>
        );
    }
  };

  return <div className="container">{renderApp(status)}</div>;
};
