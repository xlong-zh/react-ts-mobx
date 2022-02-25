const Mock = require('mockjs');
const roleList = (req) => {
  //接受参数：是JSON格式，需要转换成对象
  // const page = JSON.parse(req.body).page;
  return {
    code: 200,
    msg: 'success',
    data: Mock.mock({
      'list|10': [{ 'id|+1': 1, roleName: '@cname' }],
    }),
  };
};
const permission = (req) => {
  //接受参数：是JSON格式，需要转换成对象
  // const adminId = JSON.parse(req.body).adminId;
  return {
    code: 200,
    msg: 'success',
    data: [
      {
        id: 1,
        parentId: 0,
        isMenu: 1,
        title: '首页',
        path: '/dashborad',
        rule: '/dashborad',
        apiPath: '/dashborad',
        method: 'POST',
      },
      {
        id: 2,
        parentId: 0,
        isMenu: 1,
        title: '角色管理',
        path: '/roleAdd',
        rule: '/role/add',
        apiPath: '/role/add',
        method: 'POST',
      },
      {
        id: 3,
        parentId: 2,
        isMenu: 0,
        title: '添加角色',
        path: 'roleAdd',
        rule: '/role/add',
        apiPath: '/role/add',
        method: 'POST',
      },
      {
        id: 4,
        parentId: 2,
        isMenu: 0,
        title: '删除角色',
        path: 'roleDel',
        rule: '/role/del',
        apiPath: '/role/del',
        method: 'POST',
      },
    ],
  };
};
const permissionMenu = (req) => {
  //接受参数：是JSON格式，需要转换成对象
  // const adminId = JSON.parse(req.body).adminId;
  return {
    code: 200,
    msg: 'success',
    data: [
      { path: '/dashboard', icon: 's-data', title: '看板模块' },
      {
        path: '/permission',
        icon: 'lock',
        title: '权限模块',
        children: [
          { path: '/permission/page', title: '界面查看' },
          { path: '/permission/directive', title: '指令查看' },
        ],
      },
      {
        path: '/table',
        icon: 'date',
        title: '表格模块',
        children: [
          { path: '/table/dynamic-table', title: '表格1' },
          {
            path: '/table/menu-nest',
            title: '嵌套菜单',
            children: [
              {
                path: '/table/menu-nest/test-menu1',
                title: '嵌套菜单1',
              },
            ],
          },
        ],
      },
    ],
  };
};

module.exports = [
  {
    'post|roleList': roleList,
    'post|permission': permission,
    'post|permissionMenu': permissionMenu,
  },
];
