const Mock = require('mockjs');
const adminList = (req) => {
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
    'get|adminList': adminList,
  },
];
