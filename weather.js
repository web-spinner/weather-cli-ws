#!/usr/bin/env node
import { getArgs } from './helpers/args.js';
import { toCapitalizeWord } from './helpers/capitalize.js';
import { getIcon, getWeather } from './services/api.service.js';
import { printHelp, printSuccess, printError, printWeather } from './services/log.service.js';
import { getKeyValue, setKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';

const setValue = async (key, value, subjectPrintMessage) => {
  if(!value.length) {

    printError(`Не передан ${subjectPrintMessage}`);
    return;
  }
  try {
    await setKeyValue(key, value);
    printSuccess(`${toCapitalizeWord(subjectPrintMessage)} сохранен`);
  } catch (e) {
    printError(e.message);
  }
}

const setToken = async (token) => {
  await setValue(TOKEN_DICTIONARY.token, token, 'токен')
}

const setCity = async (city) => {
  await setValue(TOKEN_DICTIONARY.city, city, 'город')
}

const getForecast = async () => {
  try {
    const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city) ?? 'moscow';
    const data = await getWeather(city);
    const icon = getIcon(data.weather[0].icon);
    printWeather(data, icon);
  } catch (e) {
    if(e?.response?.status == 404) {
      printError('Неверно указан город')
    } else if(e?.response?.status == 401) {
      printError('Неверно указан токен')
    } else {
      printError(e.message)
    }
  }
}

const initCLI = () => {
  const args = getArgs(process.argv);

  if(args.h) {
    // Вывод help
    return printHelp();
  }

  if(args.s) {
    // Сохранить город
    return setCity(args.s)
  }

  if(args.t) {
    // Сохранить токен
    return setToken(args.t);
  }

  // Вывести погоду
  return getForecast()
}

initCLI();
