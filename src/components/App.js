import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/App.css';
import { YMaps, Map, GeolocationControl } from '@pbe/react-yandex-maps';

const WEATHER_API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const YANDEX_API_KEY = process.env.REACT_APP_YANDEX_API_KEY;

function App() {
  const [selectedCity, setSelectedCity] = useState('Москва');
  const [weatherNow, setWeatherNow] = useState(null);
  const [weather5Days, setWeather5Days] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city) => {
    try {
      setLoading(true);
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );
      setWeatherNow(weatherRes.data);

      const forecastRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
      );

      const grouped = {};
      forecastRes.data.list.forEach((item) => {
        const date = item.dt_txt.split(' ')[0];
        const hour = item.dt_txt.split(' ')[1].split(':')[0];
        if (!grouped[date] && hour === '12') {
          grouped[date] = item;
        }
      });

      const fiveDays = Object.entries(grouped).slice(0, 5).map(([date, data]) => ({
        date,
        temp: data.main.temp,
        desc: data.weather[0].description,
      }));

      setWeather5Days(fiveDays);
    } catch (err) {
      console.error('Ошибка при получении данных:', err);
      setWeatherNow(null);
      setWeather5Days([]);
    } finally {
      setLoading(false);
    }
  };

  const getCityByCoords = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://geocode-maps.yandex.ru/1.x/?apikey=${YANDEX_API_KEY}&geocode=${lon},${lat}&format=json`
      );
      const geoObject = res.data.response.GeoObjectCollection.featureMember[0]?.GeoObject;
      const cityName =
        geoObject?.metaDataProperty?.GeocoderMetaData?.Address?.Components?.find(
          (c) => c.kind === 'locality'
        )?.name;
      if (cityName) {
        setSelectedCity(cityName);
      } else {
        alert('Не удалось определить город по координатам.');
      }
    } catch (err) {
      console.error('Ошибка при геокодировании:', err);
    }
  };

  useEffect(() => {
    fetchWeather(selectedCity);
  }, [selectedCity]);

  return (
    <div className="app">
      <h1>Weather Viewer</h1>

      <YMaps query={{ apikey: YANDEX_API_KEY }}>
        <Map
          defaultState={{ center: [55.75, 37.57], zoom: 4 }}
          width="100%"
          height="300px"
          onClick={(e) => {
            const coords = e.get('coords');
            getCityByCoords(coords[0], coords[1]);
          }}
        >
          <GeolocationControl options={{ float: 'left' }} />
        </Map>
      </YMaps>

      {loading ? (
        <p>Загрузка...</p>
      ) : weatherNow ? (
        <div className="weather-info">
          <h2>Погода сейчас в {selectedCity}</h2>
          <p>Температура: {weatherNow.main.temp}°C</p>
          <p>Описание: {weatherNow.weather[0].description}</p>

          <h2>Прогноз на 5 дней</h2>
          <ul>
            {weather5Days.map((day, idx) => (
              <li key={idx}>
                {day.date}: {day.temp}°C, {day.desc}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Не удалось загрузить данные о погоде.</p>
      )}
    </div>
  );
}

export default App;
