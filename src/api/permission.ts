import request from '../utils/request';

export const getAllPermission = () => {
  return request({
    url: '/permission',
    method: 'post',
    data: {},
  });
};
export const getRoleList = (page: number = 1) => {
  return request({
    url: '/roleList',
    method: 'post',
    data: { page },
  });
};
