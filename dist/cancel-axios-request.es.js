import axios from "axios";
let tokens = /* @__PURE__ */ new Map();
const getKey = (config) => [config.url, config.method].join("&");
const add = (config) => {
  const pendingKey = getKey(config);
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
    if (!tokens.has(pendingKey)) {
      tokens.set(pendingKey, cancel);
    }
  });
};
const remove = (config) => {
  const pendingKey = getKey(config);
  if (tokens.has(pendingKey)) {
    const cancelToken = tokens.get(pendingKey);
    cancelToken(pendingKey);
    tokens.delete(pendingKey);
  }
};
const removeAll = () => {
  tokens.forEach((value, key) => {
    const cancelToken = tokens.get(key);
    cancelToken(key);
    tokens.delete(key);
  });
};
export { add, getKey, remove, removeAll };
