const events = () => {
  const subscribers = {};

  const subscribe = (event, callback) => {
    if (!subscribers[event]) subscribers[event] = [];
    subscribers[event].push(callback);
  };

  const publish = (event, data) => {
    const callbacks = subscribers[event];
    if (callbacks) callbacks.forEach(callback => { callback(data); });
  };

  return {
    subscribe,
    publish,
  };
};

let instance = null;

const eventMngr = () => {
  if (!instance) instance = events();
  return instance;
};

export default eventMngr;