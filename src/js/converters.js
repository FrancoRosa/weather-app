const converter = () => {
  const temp = (value, metric) => {
    if (metric) {
      value = (value-32)*5.0/9.0;
      return `${value} °C`;
    }
    return `${value} °F`;
  };

  const speed = (value, metric) => {
    if (metric) {
      value = (value-32)*5.0/9.0;
      return `${value} m/s`;
    }
    return `${value} miles/hour`;
  };

  return {
    temp,
    speed,
  };
}

default export converter;