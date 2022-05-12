import axios from 'axios'

const BE_SERVER_URL = "http://localhost:8080/"; // static 内的配置文件window.$serverUrlhttp://172.16.1.109:9000

//实例配置项
var WebConfig = {
    // `baseURL` 将自动加在 `url` 前面，除非 `url` 是一个绝对 URL。
    // 它可以通过设置一个 `baseURL` 便于为 axios 实例的方法传递相对 URL
    baseURL:BE_SERVER_URL,
    //表示跨域请求时是否需要使用凭证
    withCredentials: false, 
}

//创建axios 实例
const http = axios.create(WebConfig);


  //响应拦截 response
  axios.interceptors.response.use(function (response) {
    const res = response.data;
   
    // 对响应数据做点什么
    return response;
  }, function (error) {

    // 对响应错误做点什么
    // return Promise.reject(error);
    return error;
  });

  export default http
