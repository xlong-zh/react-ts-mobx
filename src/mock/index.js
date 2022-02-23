const Mock = require('mockjs');

const admin = require('./admin');
const user = require('./user');

const MOCK_ROOT = '/mock/';

const mocks = [...user, ...admin];

// module.exports = function () {
mocks.forEach((item) => {
  for (const [path, target] of Object.entries(item)) {
    const [method = 'get', url = '/'] = path.split('|');
    module.exports = Mock.mock(MOCK_ROOT + url, method, target);
  }
});
// };

// //get请求
// module.exports = Mock.mock('/user', 'get', (options) => {
//   const ret = Mock.mock({
//     user: { username: '@cname' },
//   });
//   return {
//     status: 200,
//     data: ret,
//   };
// });

// Mock.mock(MOCK_ROOT + '/adminList', 'get', {
//   code: 200,
//   msg: 'success',
//   data: {
//     'banners|1-10': [{ 'id|+1': 1, name: '@cname' }],
//   },
// });

// //get请求：模拟分页数据
// module.exports = Mock.mock(MOCK_ROOT + '/admin/list', 'get', (options) => {
//   //接受参数：是JSON格式，需要转换成对象
//   const page = JSON.parse(options.body).page;
//   if (page > 3) {
//     return {
//       code: 200,
//       msg: 'success',
//       data: [],
//     };
//   }
//   return {
//     code: 200,
//     msg: 'success',
//     data: {
//       'list|10': [{ 'id|+1': 1, name: '@cname' }],
//     },
//   };
// });
