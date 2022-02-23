import axios from 'axios';
import { message, Modal } from 'antd';
import NProgress from 'nprogress';
import { clearLocal, getLocal } from './storage';

const baseURL = process.env.REACT_APP_MOCK ? '/mock' : process.env.NODE_ENV === 'development' ? '/api' : process.env.REACT_APP_BASE_API;

const request = axios.create({
  baseURL,
  timeout: 5000,
});

request.interceptors.request.use(
  (config) => {
    NProgress.start();
    config.headers['Authorization'] = getLocal('token');
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    NProgress.done();
    if (response.status === 200) {
      const { code } = response.data;
      if (code === 4003) {
        message.warning('登录过期，请重新登录！');
        return Promise.reject('请登录');
      } else if (code === 4000) {
        clearLocal();
        // window.location.href='/login'
        return Promise.reject('认证失败');
      }
      return response.data;
    } else {
      Modal.error({ title: '网络请求错误' });
      return Promise.reject('网络请求错误');
    }
  },
  (error) => {
    Modal.error({ title: '网络请求错误' });
    NProgress.done();
    return Promise.reject(error);
  }
);

export default request;

export const get = (url: string, params?: any, config?: any) => {
  // return new Promise((resolve, reject) => request({ method: 'get', url, params, ...config }).then((res) => resolve(res), reject));
  request({ method: 'get', url, params, ...config });
};
export const deleteAction = (url: string, data?: any, config?: any) => {
  return new Promise((resolve, reject) => request({ method: 'delete', url, data, ...config }).then((res) => resolve(res), reject));
};
export const post = (url: string, data?: any, config?: any) => {
  return new Promise((resolve, reject) => request({ method: 'post', url, data, ...config }).then((res) => resolve(res), reject));
};
export const put = (url: string, data?: any, config?: any) => {
  return new Promise((resolve, reject) => request({ method: 'put', url, data, ...config }).then((res) => resolve(res), reject));
};
