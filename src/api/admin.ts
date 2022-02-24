import request from '../utils/request';

export const getAdminList = (page: number = 1) => {
  return request({
    url: '/adminList',
    method: 'post',
    data: { page },
  });
};
export const deleteAdmin = (adminId: number = 1) => {
  return request({
    url: '/adminDelete',
    method: 'post',
    data: { adminId },
  });
};
export const adminAdd = (admin: any) => {
  return request({
    url: '/adminAdd',
    method: 'post',
    data: admin,
  });
};
