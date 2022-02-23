import request from '../utils/request';

export const getAdminList = (page: number = 1) => {
  return request({
    url: '/adminList',
    method: 'get',
    data: { page },
  });
};
