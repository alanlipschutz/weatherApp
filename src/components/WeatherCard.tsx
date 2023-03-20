import React from 'react';
import { Paper, Typography } from '@mui/material';
import '../App.css';
import AirIcon from '@mui/icons-material/Air';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import { useThemeContext } from '../contexts/DarkContext';

interface WeatherCardProps {
  location: string;
  time: string;
  degree: string;
  description: string;
  air: string;
  rain: string;
  icon: string;
}
export default function WeatherCard({
  location,
  time,
  degree,
  description,
  air,
  rain,
  icon,
}: WeatherCardProps) {
  const { theme } = useThemeContext();
  return (
    <div className={`weatherBase`}>
      <div className='card-header '>
        <Typography className={`${theme ? 'card-dark' : ''}`}>
          {location}
        </Typography>
        <Typography
          className={`${theme ? 'card-dark' : ''}`}
          variant='subtitle2'
        >
          {time}
        </Typography>
      </div>
      <div className='card-number'>
        <Typography className={`${theme ? 'card-dark' : ''}`} variant='h3'>
          {degree}
        </Typography>
        <Typography
          className={`${theme ? 'card-dark' : ''}`}
          variant='subtitle1'
        >
          {description}
        </Typography>
      </div>
      <div className='card-bottom'>
        <div>
          <Typography className={`${theme ? 'card-dark' : ''}`}>
            <AirIcon />
            <span>{air}</span>
          </Typography>
          <Typography className={`${theme ? 'card-dark' : ''}`}>
            <ThunderstormIcon /> <span>{rain}</span>
          </Typography>
        </div>
        <div>
          <img src={icon} />
        </div>
      </div>
    </div>
  );
}
