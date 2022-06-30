import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as cancelRequest from "../../lib/main";

export class Http {
  public instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: "/api",
      withCredentials: true, // 跨域携带 cookie
    });
    this.interceptors();
  }

  interceptors() {
    this.instance.interceptors.request.use(
      (config: any) => {
        cancelRequest.remove(config); // 取消上一次当前路径的请求
        cancelRequest.add(config); // 添加这次路径的请求
        return config;
      },
      (error) => Promise.reject(error)
    );

    // 响应拦截器
    this.instance.interceptors.response.use(
      (response) => {
        cancelRequest.remove(response.config); // 成功后再取消一次
        return response;
      },
      (error) => {
        // cancelRequest 取消请求后会抛出 catch 错误， axios.isCancel 判断不是手动取消的错误则调用 errTip 提示
        // !axios.isCancel(error) && errTip(error?.response?.status, error?.response?.data?.message);
        return Promise.reject(error);
      }
    );
  }

  get(url: string, params: any = {}, config: any = {}) {
    return this.instance({
      method: "get",
      url,
      params,
      ...config,
    })
  }


  request(options: AxiosRequestConfig) {
    // 测试
    this.instance(options)
  }
}

export default new Http();
