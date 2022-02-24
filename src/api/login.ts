import request from '../utils/request';

export const login = (name: string, password: string) => {
  return request({
    url: '/login',
    method: 'post',
    data: { name, password },
  });
};
export const getAdminInfo = () => {
  return request({
    url: '/getAdminInfo',
    method: 'post',
    data: {},
  });
};
