import React, { ReactNode, Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { constRoutes, asyncRoutes, IRouter } from '../router';
import AppLayout from './AppLayout';

export default class Index extends React.Component {
  generateRouter = (routerList?: IRouter[]): ReactNode => {
    return routerList?.map((r) => {
      if (r.children) {
        return this.generateRouter(r.children);
      }
      return <Route key={r.path} {...r} />;
    });
  };
  render() {
    return (
      <>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Redirect from="/" exact to="/dashborad" />
              {/* 公开路由 */}
              {constRoutes.map((r) => (
                <Route key={r.path} {...r} />
              ))}
              <Route path="/">
                <AppLayout>
                  <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                      {/* 权限路由 */}
                      {this.generateRouter(asyncRoutes)}
                      <Redirect from="*" exact to="/404" />
                    </Switch>
                  </Suspense>
                </AppLayout>
              </Route>
            </Switch>
          </Suspense>
        </BrowserRouter>
      </>
    );
  }
}
