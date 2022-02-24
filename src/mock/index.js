const Mock = require('mockjs');

const admin = require('./admin');
const user = require('./user');
const permission = require('./permission');

const MOCK_ROOT = '/mock/';

const mocks = [...user, ...admin, ...permission];

mocks.forEach((item) => {
  for (const [path, target] of Object.entries(item)) {
    const [method = 'get', url = '/'] = path.split('|');
    module.exports = Mock.mock(MOCK_ROOT + url, method, target);
  }
});
