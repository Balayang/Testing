import React from 'react';
import { SideBar } from './SideBar/SideBar';
import { WeatherInfo } from './WeatherInfo/WeatherInfo';
import { ErrorMessageElement } from './ErrorMessageElement/ErrorMessageElement';

import '../styles/global.css';

export const App = () => {
  const [status, setStatus] = React.useState('LOADING');
  const [position, setPosition] = React.useState(undefined);
  const [location, setLocation] = React.useState(undefined);
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

  const capitalize = str => {
    const srtArr = str.toLowerCase().split(' ');
    const capitalizedArr = srtArr.map(word => `${word[0].toUpperCase()}${word.slice(1)}`);
    return capitalizedArr.join(' ');
  };

  const getApiUrl = () =>
    !location
      ? `https://api.openweathermap.org/data/2.5/weather?lat=${position.latitude}&lon=${position.longitude}&appid=${process.env.REACT_APP_API_KEY}&units=metric`
      : `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_API_KEY}&units=metric`;

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
      const rawData = await (await fetch(getApiUrl())).json();
      setWeatherData({
        name: rawData.name,
        temperature: Math.round(rawData.main.temp),
        country: rawData.sys.country,
        description: capitalize(rawData.weather[0].description),
        humidity: rawData.main.humidity,
        wind: rawData.wind.speed,
        feelsLike: Math.round(rawData.main.feels_like),
        icon: rawData.weather[0].icon,
      });
    };
    if (position || location) {
      getWeatherData();
    }
  }, [position, location]);

  React.useEffect(() => {
    if ((weatherData && position) || (weatherData && location)) {
      setStatus('SUCCESS');
    } else {
      setStatus('LOADING');
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
              setLocation={setLocation}
            />
          </>
        );

      case 'ERROR':
        return <ErrorMessageElement messageText={errorMessage} />;
      case 'LOADING':
        return <ErrorMessageElement messageText={'LOADING...'} />;
      default:
        return <ErrorMessageElement messageText={'LOADING...'} />;
    }
  };

  return <main className="container">{renderApp(status)}</main>;
};
