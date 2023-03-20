export enum severityTypes {
  success = 'success',
  warning = 'warning',
  info = 'info',
  error = 'error',
}

export interface forecastResponse {
  date: string;
  day: {
    condition: {
      code: number;
      icon: string;
      text: string;
    };
    avgtemp_c: number;
    avgvis_km: number;
    daily_chance_of_rain: number;
  };
}

export type WeatherResponse = {
  current: {
    condition: {
      code: number;
      icon: string;
      text: string;
    };
    wind_kph: number;
    temp_c: number;
    cloud: number;
    last_updated: string;
  };
  location: {
    country: string;
    name: string;
    localTime: string;
  };
  forecast: {
    forecastday: forecastResponse[];
  };
};
