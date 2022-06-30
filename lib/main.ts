import axios, { AxiosRequestConfig } from "axios";

let tokens = new Map();

export const getKey = (config: AxiosRequestConfig): string => [config.url, config.method].join("&")

export const add = (config: AxiosRequestConfig) => {
  const pendingKey = getKey(config);
  config.cancelToken =
    config.cancelToken ||
    new axios.CancelToken((cancel) => {
      if (!tokens.has(pendingKey)) {
        tokens.set(pendingKey, cancel);
      }
    });
}
export const remove = (config: AxiosRequestConfig) => {
  const pendingKey = getKey(config);
  if (tokens.has(pendingKey)) {
    const cancelToken = tokens.get(pendingKey);
    cancelToken(pendingKey);
    tokens.delete(pendingKey);
  }
}

export const removeAll = () => {
  tokens.forEach((value, key) => {
    const cancelToken = tokens.get(key);
    cancelToken(key);
    tokens.delete(key);
  });
}
