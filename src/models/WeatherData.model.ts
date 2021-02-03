export interface WeatherData {
  clouds: {all: number};
  coord: {lon: number; lat: number};
  main: {
    feels_like: number;
    humidity: number;
    pressure: number;
    temp: number;
    temp_max: number;
    temp_min: number;
  };
  name: string;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  visibility: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  wind: {speed: number; deg: number};
}

export interface WeatherDetailedData {
  clouds: number;
  dew_point: number;
  dt: number;
  feels_like: number;
  humidity: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    eve: number;
    max: number;
    min: number;
    morn: number;
    night: number;
  };
  uvi: number;
  visibility: number;
  weather: {id: number; main: string; description: string; icon: string}[];
  wind_deg: number;
  wind_speed: number;
}

export interface WeatherDetailedDataSet {
  current: WeatherDetailedData;
  daily: WeatherDetailedData[];
  hourly: WeatherDetailedData[];
}

export const WeatherIcons: {[key in string]: string} = {
  '01d': 'wi-day-sunny',
  '02d': 'wi-day-cloudy',
  '03d': 'wi-cloud',
  '04d': 'wi-cloudy',
  '09d': 'wi-rain',
  '10d': 'wi-day-rain',
  '11d': 'wi-thunderstorm',
  '13d': 'wi-snow',
  '50d': 'wi-fog',
  '01n': 'wi-night-clear',
  '02n': 'wi-night-alt-cloudy',
  '03n': 'wi-cloud',
  '04n': 'wi-cloudy',
  '09n': 'wi-rain',
  '10n': 'wi-night-alt-rain',
  '11n': 'wi-thunderstorm',
  '13n': 'wi-snow',
  '50n': 'wi-fog',
};
