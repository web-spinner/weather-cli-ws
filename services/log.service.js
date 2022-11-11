import chalk from 'chalk';
import dedent from 'dedent-js';
import { getWindroseFromAzimuth } from '../helpers/windrose.js';
import { toCapitalizeWord } from '../helpers/capitalize.js';

const printError = (error) => {
  console.log(chalk.bgRed(' ERROR ') + ' ' + error  );
}

const printSuccess = (message) => {
  console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message  );
}

const printHelp = () => {
  console.log(
    dedent`
      ${chalk.bgBlue(' HELP ')}
      Без параметров - вывод погоды
      -h - вывод помощи
      -s [CITY] - установка города 
      -t [API_KEY] - сохранение токена
    `
  );
}

const printWeather = (res, icon) => {
  console.log(
    dedent`
      ${chalk.bgBlueBright(' WEATHER ')} Погода в городе ${res.name}
      ${icon}  ${toCapitalizeWord(res.weather[0].description)}
      Температура: ${res.main.temp}°C ( ощущается как ${res.main.feels_like}°C )
      Влажность: ${res.main.humidity}%
      Направление ветра: ${getWindroseFromAzimuth(res.wind.deg)}
      Скорость ветра: ${res.wind.speed} м/c
    `
  );
}

export { printError, printSuccess, printHelp, printWeather }
