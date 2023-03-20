import React from 'react';
import { Container, Typography, useMediaQuery } from '@mui/material';
import WeatherCard from './WeatherCard';
import 'swiper/css';
import 'swiper/css/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { forecastResponse, WeatherResponse } from '../types/Types';
import { useThemeContext } from '../contexts/DarkContext';
import '../App.css';

interface PropsWeatherBox {
  weatherResponse: WeatherResponse;
  forecastList: forecastResponse[];
}
export default function WeatherBox({
  weatherResponse,
  forecastList,
}: PropsWeatherBox) {
  const { theme } = useThemeContext();
  const smallScreen = useMediaQuery('(max-width: 1070px)');
  return (
    <Container>
      {weatherResponse ? (
        <>
          <div className='main-weather'>
            <WeatherCard
              location={weatherResponse?.location.name}
              air={`${weatherResponse.current.wind_kph} km/h`}
              degree={`${weatherResponse.current.temp_c} °C`}
              description={weatherResponse.current.condition.text}
              rain={`${weatherResponse.current.cloud}%`}
              time={weatherResponse.current.last_updated}
              icon={weatherResponse.current.condition.icon}
            />
          </div>
          {forecastList ? (
            <div id='forecast-weather'>
              <Typography
                variant='h2'
                className={`${theme ? 'card-dark' : ''}`}
              >
                Next days
              </Typography>
              {!smallScreen ? (
                <Swiper
                  spaceBetween={50}
                  slidesPerView={3}
                  navigation={true}
                  modules={[Navigation]}
                  className='mySwiper'
                >
                  {forecastList.map((day) => (
                    <SwiperSlide key={day.date}>
                      <WeatherCard
                        location={weatherResponse.location.name}
                        air={`${day.day.avgvis_km} km/h`}
                        degree={`${day.day.avgtemp_c} °C`}
                        description={day.day.condition.text}
                        rain={`${day.day.daily_chance_of_rain}%`}
                        time={day.date}
                        icon={day.day.condition.icon}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <div className='card-container'>
                  {forecastList.map((day) => (
                    <WeatherCard
                      key={day.date}
                      location={weatherResponse.location.name}
                      air={`${day.day.avgvis_km} km/h`}
                      degree={`${day.day.avgtemp_c} °C`}
                      description={day.day.condition.text}
                      rain={`${day.day.daily_chance_of_rain}%`}
                      time={day.date}
                      icon={day.day.condition.icon}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : null}
        </>
      ) : null}
    </Container>
  );
}
