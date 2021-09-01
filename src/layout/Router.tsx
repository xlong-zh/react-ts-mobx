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
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <Switch>
              <Redirect from="/" exact to="/dashborad" />
              {/* 公开路由 */}
              {constRoutes.map((r) => (
                <Route key={r.path} {...r} />
              ))}
              <Route path="/">
                <AppLayout>
                  <Switch>
                    {/* 权限路由 */}
                    {/* {asyncRoutes.map((r) => (
                      <Route key={r.path} {...r} />
                    ))} */}
                    {this.generateRouter(asyncRoutes)}
                    <Redirect from="*" exact to="/404" />
                  </Switch>
                </AppLayout>
              </Route>
            </Switch>
          </BrowserRouter>
        </Suspense>
      </>
    );
  }
}
