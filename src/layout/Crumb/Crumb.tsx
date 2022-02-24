import React, { ReactNode } from 'react';
import { Breadcrumb } from 'antd';
import { matchPath, RouteComponentProps, withRouter } from 'react-router-dom';
import { asyncRoutes, IRouter } from '../../router';

interface IProps extends RouteComponentProps {}

class Index extends React.Component<IProps> {
  componentDidMount() {}

  generate = (routerList: IRouter[]): ReactNode => {
    let path = this.props.location.pathname;
    return (
      <>
        {routerList.map((r) => {
          let match = matchPath(path, { path: r.path });
          if (match) {
            return (
              <React.Fragment key={r.path}>
                <Breadcrumb.Item>{r.title}</Breadcrumb.Item>
                {r.children && r.children.length ? this.generate(r.children) : null}
              </React.Fragment>
            );
          }
          return null;
        })}
      </>
    );
  };

  render() {
    return <Breadcrumb style={{ margin: '16px 0' }}>{this.generate(asyncRoutes)}</Breadcrumb>;
  }
}
export default withRouter(Index);
