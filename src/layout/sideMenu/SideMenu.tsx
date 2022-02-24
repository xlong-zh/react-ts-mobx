import React, { ReactNode } from 'react';
import { Link, matchPath, RouteComponentProps, withRouter } from 'react-router-dom';
import { Menu, Layout } from 'antd';

import { asyncRoutes, IRouter } from '../../router';

const { SubMenu, Item } = Menu;
const { Sider } = Layout;

interface IState {
  defaultOpenKeys: string[];
  defaultSelectedKeys: string[];
}
interface IProps extends RouteComponentProps {}

class Index extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      defaultOpenKeys: [],
      defaultSelectedKeys: [],
    };
  }
  UNSAFE_componentWillMount() {
    this.heghtMenu(asyncRoutes);
  }
  heghtMenu = (asyncRoutes: IRouter[]) => {
    let path = this.props.location.pathname;
    for (let r of asyncRoutes) {
      let match = matchPath(path, { path: r.path });
      if (match) {
        console.log(match);
        if (match.isExact) {
          this.setState({ defaultSelectedKeys: [r.path] });
        } else {
          this.setState({ defaultOpenKeys: [r.path] });
        }
      }
      if (r.children && r.children.length) {
        this.heghtMenu(r.children);
      }
    }
  };
  generateMenu = (routerList?: IRouter[]): ReactNode => {
    return routerList?.map((r) => {
      if (r.children) {
        return (
          // title={
          //   <span>
          //     {r.icon && <r.icon></r.icon>}
          //     <span>{r.title}</span>
          //   </span>
          // }
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
          {this.state.defaultSelectedKeys ? (
            <Menu
              mode="inline"
              defaultSelectedKeys={this.state.defaultSelectedKeys}
              defaultOpenKeys={this.state.defaultOpenKeys}
              style={{ height: '100%', borderRight: 0 }}
            >
              {this.generateMenu(asyncRoutes)}
            </Menu>
          ) : null}
        </Sider>
      </>
    );
  }
}

export default withRouter(Index);
