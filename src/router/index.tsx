import { lazy } from 'react';

const Login = lazy(() => import('../pages/Login'));
const Dashborad = lazy(() => import('../pages/Dashboard/Index'));
const Err404 = lazy(() => import('../pages/404/404'));

interface IRouter {
  title: string;
  path: string;
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
    exact: true,
    component: Dashborad,
  },
];
