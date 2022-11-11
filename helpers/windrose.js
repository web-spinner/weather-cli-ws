const windrose = [
  {
    name: 'north',
    label: 'Север',
    azimuth: 0
  },
  {
    name: 'northeast',
    label: 'Северо-Восток',
    azimuth: 45 
  },
  {
    name: 'east',
    label: 'Востоk',
    azimuth: 90 
  },
  {
    name: 'southeast',
    label: 'Юго-Востоk',
    azimuth: 135 
  },
  {
    name: 'south',
    label: 'Юг',
    azimuth: 180 
  },
  {
    name: 'southwest',
    label: 'Юго-Запад',
    azimuth: 225 
  },
  {
    name: 'west',
    label: 'Запад',
    azimuth: 270 
  },
  {
    name: 'northwest',
    label: 'Северо-Запад',
    azimuth: 315 
  }
]

const roundAzimuth = (azimuth) => {
  return Math.round(azimuth / 45) * 45;
}

const getWindroseFromAzimuth = (azimuth) => {

  if(azimuth < 0 || azimuth > 360) {
    return 'ERROR Неверный азимут';
  }

  const data = windrose.find((i) => i.azimuth == roundAzimuth(azimuth))

  return data.label;
}

export { getWindroseFromAzimuth }
