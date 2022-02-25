import { inject, observer } from 'mobx-react';
import React, { Component, ReactNode } from 'react';
import { IRouter } from '../router';
import PermissionStore from '../store/PermissionStore';

interface IProps {
  path: string;
  children?: ReactNode;
  PermissionStore?: PermissionStore;
}

@inject('PermissionStore')
@observer
class Auth extends Component<IProps> {
  render() {
    let auth: boolean = false;
    this.props.PermissionStore?.permissionList.forEach((permission: IRouter) => {
      if (permission.path === this.props.path) {
        auth = true;
      }
    });
    if (auth) {
      return <>{this.props.children}</>;
    }
    return null;
  }
}

export default Auth;
