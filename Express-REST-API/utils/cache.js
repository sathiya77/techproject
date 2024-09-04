const cache = new Map();

const get = (key) => cache.get(key);

const set = (key, value) => cache.set(key, value);

const has = (key) => cache.has(key);

module.exports = {
  get,
  set,
  has,
};
