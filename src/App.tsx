import React from 'react';
import Router from './layout/Router';
import { inject, observer } from 'mobx-react';
import AdminStore from './store/AdminStore';
import PermissionStore from './store/PermissionStore';

interface IProps {
  AdminStore?: AdminStore;
  PermissionStore?: PermissionStore;
}

@inject('AdminStore', 'PermissionStore')
@observer
class App extends React.Component<IProps> {
  
  componentDidMount() {
    this.props.AdminStore?.initAdmin();
    this.props.PermissionStore?.initPermission();
  }

  render() {
    return (
      <>
        <Router />
      </>
    );
  }
}
export default App;
