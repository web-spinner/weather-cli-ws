import { homedir } from 'os';
import { join } from 'path';
import { promises } from 'fs';

const filePath = join(homedir(), 'weather-data.json');

const TOKEN_DICTIONARY = {
  token: 'token',
  city: 'city'
}

const isExist = async (path) => {
  try {
    await promises.stat(path);
    return true;
  } catch (error) {
    return false;
  }
}

const readFile = async (path) => {
  const file = await promises.readFile(path);
  return JSON.parse(file);
} 

const setKeyValue = async (key, value) => {
  let data = {}

  if(await isExist(filePath)) {
    data = await readFile(filePath);
  }

  data[key] = value;

  await promises.writeFile(filePath, JSON.stringify(data));
}

const getKeyValue = async (key) => {
  if(await isExist(filePath)) {
    const data = await readFile(filePath);
    return data[key];
  }

  return undefined;
}

export { setKeyValue, getKeyValue, TOKEN_DICTIONARY }
