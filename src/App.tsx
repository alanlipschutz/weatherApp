import React, { useState, useEffect } from 'react';
import SwitchColor from './components/SwitchColor';
import axios from 'axios';
import SnackAlert from './components/SnackAlert';
import {
  forecastResponse,
  severityTypes,
  WeatherResponse,
} from './types/Types';
import WeatherBox from './components/WeatherBox';
import FormInput from './components/FormInput';
import './App.css';
import { ThemeContext } from './contexts/DarkContext';

function App() {
  // theme color (dark light)
  const [theme, setTheme] = useState<boolean>(false);

  // input states
  const [cityInput, setCityInput] = useState<string>('');
  const [useGeolocalization, setUseGeolocalization] = useState<boolean>(false);
  const [days, setDays] = useState<string>('7');

  // response state
  const [weatherResponse, setWeatherResponse] =
    useState<WeatherResponse | null>(null);
  const [forecastList, setForecastList] = useState<forecastResponse[]>([]);

  // Snack states
  const [openSnack, setOpenSnack] = useState<boolean>(false);
  const [snackMessage, setSnackMessage] = useState<string>('');
  const [severity, setSeverity] = useState<severityTypes>(
    severityTypes.success
  );

  useEffect(() => {
    const abortController = new AbortController();
    cityInput && onSearch(undefined, abortController);

    return () => {
      abortController.abort();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  useEffect(() => {
    if (theme) {
      document.body.classList.add('app-dark');
    } else {
      document.body.classList.remove('app-dark');
    }
  }, [theme]);

  const BASE_URL = 'http://api.weatherapi.com/v1/forecast.json';
  const API_KEY = '805bc73414114f5d95591447231903';

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked);
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUseGeolocalization(true);
          setCityInput(
            `${position.coords.latitude.toString()},${position.coords.longitude.toString()}`
          );
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, []);

  useEffect(() => {
    const abortController = new AbortController();
    useGeolocalization && onSearch(undefined, abortController);

    return () => {
      abortController.abort();
    };
  });

  const onSearch = async (
    event?: React.FormEvent<HTMLFormElement>,
    abortController: AbortController | boolean = false
  ) => {
    let config = {};
    if (abortController instanceof AbortController) {
      config = { ...config, signal: abortController.signal };
    }
    event && event.preventDefault();
    try {
      const { data } = await axios.get<WeatherResponse>(
        `${BASE_URL}?key=${API_KEY}&q=${cityInput}&days=${days}`,
        config
      );
      setWeatherResponse(data);
      setForecastList(data.forecast.forecastday);
    } catch (error: any) {
      if (error.message === 'canceled') {
        return;
      }
      setOpenSnack(true);
      setSeverity(severityTypes.error);
      setSnackMessage(`something wrong happend\n ${JSON.stringify(error)}`);
    }
  };

  const handleChangeString = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCityInput(event.target.value);
    setUseGeolocalization(false);
  };

  const selectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setDays(value);
  };
  return (
    <ThemeContext.Provider value={{ theme, handleChange }}>
      <div className={`App ${theme ? 'app-dark' : ''}`}>
        <header className={`header ${theme ? 'dark' : ''}`}>
          <h1>Weather app</h1>
          <SwitchColor />
        </header>
        <form className='main' onSubmit={onSearch}>
          <FormInput
            cityInput={cityInput}
            days={days}
            handleChangeString={handleChangeString}
            theme={theme}
            selectChange={selectChange}
          />
        </form>
        <section id='weathers'>
          {weatherResponse ? (
            <WeatherBox
              weatherResponse={weatherResponse}
              forecastList={forecastList}
            />
          ) : null}
        </section>
        <SnackAlert
          open={openSnack}
          setOpen={setOpenSnack}
          severity={severity}
          message={snackMessage}
        />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
