import React, { Suspense } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { constRoutes, asyncRoutes } from '../router';
import AppLayout from './AppLayout';

export default class Index extends React.Component {
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
                    {asyncRoutes.map((r) => (
                      <Route key={r.path} {...r} />
                    ))}
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
