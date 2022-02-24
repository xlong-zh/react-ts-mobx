import { lazy, ReactNode, LazyExoticComponent } from 'react';
import { UserOutlined, LaptopOutlined } from '@ant-design/icons';

const Login = lazy(() => import('../pages/Login'));
const Err404 = lazy(() => import('../pages/404/404'));
const Dashborad = lazy(() => import('../pages/dashboard/Index'));
const UserList = lazy(() => import('../pages/user/UserList'));
const AdminList = lazy(() => import('../pages/admin/AdminList'));
const RoleList = lazy(() => import('../pages/role/RoleList'));

export interface IRouter {
  title: string;
  path: string;
  icon?: ReactNode;
  exact?: boolean;
  component?: LazyExoticComponent<any>;
  children?: IRouter[];
}
export const constRoutes: IRouter[] = [
  {
    path: '/login',
    title: '登录',
    exact: true,
    component: Login,
  },
  {
    path: '/404',
    title: '404',
    exact: true,
    component: Err404,
  },
];
export const asyncRoutes: IRouter[] = [
  {
    path: '/dashborad',
    title: '首页',
    icon: <UserOutlined />,
    exact: true,
    component: Dashborad,
  },
  {
    path: '/userList',
    title: '用户管理',
    icon: <LaptopOutlined />,
    // exact: true,
    children: [
      {
        path: '/userList/list',
        title: '用户列表',
        icon: <LaptopOutlined />,
        exact: true,
        component: UserList,
      },
    ],
  },
  {
    path: '/admin',
    title: '管理员管理',
    icon: <LaptopOutlined />,
    // exact: true,
    children: [
      {
        path: '/admin/list',
        title: '管理员列表',
        icon: <LaptopOutlined />,
        exact: true,
        component: AdminList,
      },
    ],
  },
  {
    path: '/role',
    title: '角色管理',
    icon: <LaptopOutlined />,
    children: [
      {
        path: '/role/list',
        title: '角色列表',
        icon: <LaptopOutlined />,
        exact: true,
        component: RoleList,
      },
    ],
  },
];
