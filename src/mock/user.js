const Mock = require('mockjs');
const login = (req) => {
  //接受参数：是JSON格式，需要转换成对象
  const username = JSON.parse(req.body).username;
  return {
    code: 200,
    msg: 'success',
    data: {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: username,
      token: 11111111111,
      sex: 1,
      role: ['admin'],
    },
  };
};
const loginOut = (req) => {
  //接受参数：是JSON格式，需要转换成对象
  return {
    code: 200,
    msg: '退出成功',
  };
};
const changeRole = (req) => {
  //接受参数：是JSON格式，需要转换成对象
  const roleName = JSON.parse(req.body).roleName;
  return {
    code: 200,
    msg: '获取成功',
    data: {
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: roleName,
      sex: 1,
      role: roleName,
    },
  };
};
const userList = (req) => {
  //接受参数：是JSON格式，需要转换成对象
  const page = JSON.parse(req.body).page;
  if (page > 3) {
    return {
      code: 200,
      msg: 'success',
      data: [],
    };
  }
  return {
    code: 200,
    msg: 'success',
    data: Mock.mock({
      'list|3-10': [{ 'id|+1': 1, name: '@cname', mobile: '111', email: '222' }],
    }),
  };
};

module.exports = [
  {
    'post|login': login,
    'post|loginOut': loginOut,
    'post|changeRole': changeRole,
    'post|userList': userList,
  },
];
