import React from 'react';
import { Link, Router } from 'react-router-dom';
import { Menu, Layout } from 'antd';

import { asyncRoutes, IRouter } from '../../router';

// import styles from './index.less';
const { SubMenu, Item } = Menu;
const { Sider } = Layout;

export default class Index extends React.Component {
  generateMenu = (routerList?: IRouter[]) => {
    return routerList?.map((r) => {
      if (r.children) {
        return (
          <SubMenu key={r.path} icon={r.icon} title={r.title}>
            {this.generateMenu(r.children)}
          </SubMenu>
        );
      }
      return (
        <Item key={r.path} icon={r.icon}>
          <Link to={r.path}>{r.title}</Link>
        </Item>
      );
    });
  };

  render() {
    return (
      <>
        <Sider width={200} className="site-layout-background">
          <Menu mode="inline" defaultSelectedKeys={['1']} defaultOpenKeys={['sub1']} style={{ height: '100%', borderRight: 0 }}>
            {this.generateMenu(asyncRoutes)}
          </Menu>
        </Sider>
      </>
    );
  }
}
