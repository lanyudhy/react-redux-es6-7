/**
 * Created by diaohy on 2016/10/10.
 */
import axios from 'axios';

//封装好的get和post接口，调用方法参考action文件
const instance = axios.create({
    baseURL: 'https://www.easy-mock.com/mock/593611b991470c0ac101d474', //设置默认api路径
    timeout: 5000, //设置超时时间
    headers: {'X-Custom-Header': 'foobar'}
});
// Add a request interceptor
instance.interceptors.request.use(function (config) {
    // Do something before request is sent
    // console.log(config);
    // console.log("axios request");
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    // Do something with response data
    // console.log(response);
    // console.log("axios response");
    return response;
}, function (error) {
    // Do something with response error
    return Promise.reject(error);
});

export default instance;