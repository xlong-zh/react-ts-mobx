import { lazy, ReactNode } from 'react';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

const Login = lazy(() => import('../pages/Login'));
const Err404 = lazy(() => import('../pages/404/404'));
const Dashborad = lazy(() => import('../pages/dashboard/Index'));
const UserList = lazy(() => import('../pages/user/UserList'));

export interface IRouter {
  title: string;
  path: string;
  icon?: ReactNode;
  exact?: boolean;
  component?: any;
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
    icon: UserOutlined,
    exact: true,
    component: Dashborad,
  },
  {
    path: '/userList',
    title: '用户管理',
    icon: LaptopOutlined,
    exact: true,
    // component: UserList,
    children:[
      {
        path: '/userList/list',
        title: '用户列表',
        icon: LaptopOutlined,
        exact: true,
        component: UserList,
      },
    ]
  },
];
