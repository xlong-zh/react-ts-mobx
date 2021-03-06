import React from 'react';
import { Button, Space, Table } from 'antd';
import { getRoleList } from '../../api/permission';
import DeleteRole from './DeleteRole';
import AddRole from './AddRole';
import EditRole from './EditRole';
import Auth from '../../components/Auth';

export interface IRole {
  id: number;
  roleName: string;
}
interface IState {
  adminList: IRole[];
  current: number;
  pageSize: number;
  total: number;
  loading: boolean;
  showAddRoleModal: boolean;
  showEditRoleModal: boolean;
  role?: IRole;
}
export default class Index extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      adminList: [
        {
          id: 1,
          roleName: 'asd',
        },
      ],
      current: 1,
      pageSize: 5,
      total: 0,
      loading: false,
      showAddRoleModal: false,
      showEditRoleModal: false,
    };
  }

  componentDidMount() {
    this.getRoleList();
  }

  getRoleList = (page: number = 1) => {
    this.setState({
      loading: true,
    });
    getRoleList(page).then((res) => {
      console.log(res);
      const { list } = res.data;
      this.setState({
        adminList: list,
        loading: false,
        current: 1,
        pageSize: 5,
        total: 10,
      });
    });
  };
  change = (pagination: any) => {
    this.getRoleList(pagination.current);
  };
  showAddRoleModal = () => {
    this.setState({
      showAddRoleModal: true,
    });
  };
  hideAddModale = (refresh?: boolean) => {
    if (refresh) {
      this.getRoleList();
    }
    this.setState({
      showAddRoleModal: false,
    });
  };
  hideEditModale = (refresh?: boolean) => {
    if (refresh) {
      this.getRoleList();
    }
    this.setState({
      showEditRoleModal: false,
    });
  };
  deleteRole = (id: number) => {
    this.setState((state) => ({
      adminList: state.adminList.filter((admin) => admin.id !== id),
    }));
  };
  showEditRoleModal = (role: IRole) => {
    this.setState({
      role: role,
      showEditRoleModal: true,
    });
  };
  render() {
    return (
      <>
        <Button type="primary" onClick={this.showAddRoleModal}>
          ????????????
        </Button>
        <Table
          loading={this.state.loading}
          dataSource={this.state.adminList}
          rowKey={'id'}
          pagination={{ position: ['bottomCenter'], total: this.state.total, pageSize: this.state.pageSize, showSizeChanger: false }}
          onChange={this.change}
        >
          <Table.Column title={'ID'} dataIndex={'id'} />
          <Table.Column title={'????????????'} dataIndex={'roleName'} />
          <Table.Column
            title={'??????'}
            render={(role: IRole) => (
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    this.showEditRoleModal(role);
                  }}
                >
                  ??????
                </Button>
                <Auth path="roleDel">
                  <DeleteRole id={role.id} callback={this.deleteRole} />
                </Auth>
              </Space>
            )}
          />
        </Table>
        <AddRole visible={this.state.showAddRoleModal} callback={this.hideAddModale} />
        <EditRole visible={this.state.showEditRoleModal} role={this.state.role} callback={this.hideEditModale} />
      </>
    );
  }
}
