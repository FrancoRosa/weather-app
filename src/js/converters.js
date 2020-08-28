export const temp = (value, metric) => {
  if (metric) {
    value = ((value - 32) * 5.0) / 9.0;
    return `${value} °C`;
  }
  return `${value} °F`;
};

export const speed = (value, metric) => {
  if (metric) {
    value /= 2.237;
    return `${value} m/s`;
  }
  return `${value} miles/hour`;
};
