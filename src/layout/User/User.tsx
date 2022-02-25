import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './user.module.scss';
import { inject, observer } from 'mobx-react';
import AdminStore from '../../store/AdminStore';
import PermissionStore from '../../store/PermissionStore';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  AdminStore?: AdminStore;
  PermissionStore?: PermissionStore;
}

interface IState {
  auth: boolean;
}

@inject('AdminStore', 'PermissionStore')
@observer
class Index extends React.Component<IProps> {
  state = {
    auth: false,
  };

  static getDerivedStateFromProps(props: Readonly<IProps>, state: Readonly<IState>) {
    console.log(props.PermissionStore?.state);
    if (props.PermissionStore?.state === 'success') {
      let auth: boolean = true;
      return { auth: auth };
    }

    return null;
  }

  componentDidMount() {}
  logout = () => {
    this.props.AdminStore?.logout();
    this.props.history.push('/login');
  };
  menu = (
    <Menu>
      <Menu.Item key="1" onClick={this.logout}>
        登出
      </Menu.Item>
    </Menu>
  );

  render() {
    if (this.props.PermissionStore?.state === 'loading') {
      return <>loading</>;
    }
    if (!this.state.auth) {
      return (
        <>
          <div style={{ color: '#fff' }}>noAuth</div>
        </>
      );
    }
    return (
      <div className={styles.user_wrap}>
        <div></div>
        <div>
          <Dropdown overlay={this.menu}>
            <div className={styles.user_name} onClick={(e) => e.preventDefault()}>
              {this.props.AdminStore?.admin.name || '游客'} <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    );
  }
}

export default withRouter(Index);
