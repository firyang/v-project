import axios from "axios";
import { Loading } from "element-ui";

let loadingInstance;

const CancelToken = axios.CancelToken;
const queue = []; // 请求队列
const loadingQueue = []; // 要显示loading的请求队列
// 从队列中移除已完成的请求
const removeLoadingRequest = (config) => {
  if (loadingQueue.length === 0) {
    return;
  }
  const i = loadingQueue.findIndex((c) => c.url === config.url);
  loadingQueue.splice(i, 1);
  if (loadingQueue.length === 0) {
    console.log("close loading");
    loadingInstance.close();
  }
};
// 从队列中移除已完成的请求
const removeRequest = (config) => {
  const i = queue.findIndex((c) => c.url === config.url);
  queue.splice(i, 1);
  removeLoadingRequest(config);
};

class HttpRequest {
  constructor() {
    this.baseURL = "";
    this.timeout = 30000;
  }
  setInterceptors(instance) {
    instance.interceptors.request.use((config) => {
      // 取消未完成的重复请求, 取消的请求响应结果为 undefind
      const isExist = !!queue.find((c) => c.url === config.url);
      if (isExist) {
        config.cancel();
      } else {
        config.cancelToken = new CancelToken(function executor(c) {
          config.cancel = c;
        });
        queue.push(config);
      }

      return config;
    });
    instance.interceptors.response.use(
      (res) => {
        removeRequest(res.config);
        if (res.status == 200) {
          return Promise.resolve(res.data);
        } else {
          return Promise.reject(res.data);
        }
      },
      (err) => {
        removeRequest(err.config);
      }
    );
  }
  mergeOptions(options) {
    return {
      baseURL: this.baseURL,
      timeout: this.timeout,
      ...options,
    };
  }
  request(options) {
    let loading = options.loading;
    if (loading === undefined) {
      loading = true;
    }

    if (loading) {
      const i = loadingQueue.push(options);
      if (i === 1) {
        console.log("show loading");
        loadingInstance = Loading.service({ text: "加载中..." });
      }
    }

    const instance = axios.create();
    this.setInterceptors(instance);
    const opts = this.mergeOptions(options);
    return instance(opts);
  }
  /**
   * GET 请求
   * @param { String } url 请求地址
   * @param { Object } params 请求参数
   * @param { Object } config 请求配置, 参考axios配置
   */
  get(url, params, config) {
    return this.request({
      method: "get",
      url,
      params,
      ...config,
    });
  }
  /**
   * POST 请求
   * @param { String } url 请求地址
   * @param { Object } data 请求参数
   * @param { Object } config 请求配置, 参考axios配置 http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE
   */
  post(url, data, config) {
    return this.request({
      method: "post",
      url,
      data,
      ...config,
    });
  }
  /**
   * PUT 请求
   * @param { String } url 请求地址
   * @param { Object } data 请求参数
   * @param { Object } config 请求配置
   */
  put(url, data, config) {
    return this.request({
      method: "put",
      url,
      data,
      ...config,
    });
  }
  /**
   * DELETE 请求
   * @param { String } url 请求地址
   * @param { Object } data 请求参数
   * @param { Object } config 请求配置
   */
  delete(url, data, config) {
    return this.request({
      method: "delete",
      url,
      data,
      ...config,
    });
  }
}

export default new HttpRequest();
