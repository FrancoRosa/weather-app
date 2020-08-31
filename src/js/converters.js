export const temp = (value, metric) => {
  let unit = '°F';
  let result = (((value - 273.15) * 9.0) / 5.0) + 32;
  if (metric) {
    unit = '°C';
    result = value - 273.15;
  }
  return `${result.toFixed(1)}${unit}`;
};

export const speed = (value, metric) => {
  let unit = 'mph';
  let result = value * 2.237;
  if (metric) {
    unit = 'm/s';
    result = value;
  }
  return `${(result).toFixed(1)}${unit}`;
};
