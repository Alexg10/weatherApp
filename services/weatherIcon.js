export function getWeatherIcon(weatherCode) {
  switch (weatherCode) {
    case 0:
      return "wi-day-sunny";
    case 1:
      return "wi-day-cloudy";
    case 2:
      return "wi-cloud";
    case 3:
      return "wi-cloudy";
    case 45:
    case 48:
      return "wi-cloudy-windy";
    case 51:
    case 53:
    case 55:
      return "wi-raindrop";
    case 56:
    case 57:
      return "wi-raindrops";
    case 61:
    case 63:
    case 65:
      return "wi-raindrop";
    case 66:
    case 67:
      return "wi-raindrops";
    case 71:
    case 73:
    case 75:
      return "wi-sprinkle";
    case 77:
      return "wi-sprinkle";
    case 80:
    case 81:
    case 82:
      return "wi-raindrops";
    case 85:
    case 86:
      return "wi-sprinkle";
    case 95:
      return "wi-thunderstorm";
    case 96:
    case 99:
      return "wi-thunderstorm";
    default:
      return "wi-na";
  }
}
