import React from 'react';
import { Dropdown, Menu } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import styles from './user.module.scss';
import { inject, observer } from 'mobx-react';
import AdminStore from '../../store/AdminStore';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  AdminStore?: AdminStore;
}

@inject('AdminStore')
@observer
class Index extends React.Component<IProps> {
  componentDidMount() {}
  logout = () => {
    this.props.AdminStore?.logout();
    this.props.history.push('/login');
  };
  menu = () => {
    return (
      <Menu>
        <Menu.Item key="1" onClick={this.logout}>
          登出
        </Menu.Item>
      </Menu>
    );
  };
  render() {
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
