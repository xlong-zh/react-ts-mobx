import React from 'react';
import { Button, Space, Table } from 'antd';
import { getAdminList } from '../../api/admin';
import DeleteAdmin from './DeleteAdmin';
import AddAdmin from './AddAdmin';

export interface IAdmin {
  id: number;
  name: string;
  mobile: string;
  email: string;
}
interface IState {
  adminList: IAdmin[];
  current: number;
  pageSize: number;
  total: number;
  loading: boolean;
  showAddAdminModal: boolean;
}
export default class Index extends React.Component<any, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      adminList: [
        {
          id: 1,
          name: 'asd',
          email: 'a1',
          mobile: 'a1',
        },
      ],
      current: 1,
      pageSize: 5,
      total: 0,
      loading: false,
      showAddAdminModal: false,
    };
  }

  componentDidMount() {
    this.getAdminList();
  }

  getAdminList = (page: number = 1) => {
    this.setState({
      loading: true,
    });
    getAdminList(page).then((res) => {
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
    this.getAdminList(pagination.current);
  };
  showAddAdminModal = () => {
    this.setState({
      showAddAdminModal: true,
    });
  };
  hideAddModale = (refresh?: boolean) => {
    if (refresh) {
      this.getAdminList();
    }
    this.setState({
      showAddAdminModal: false,
    });
  };
  deleteAdmin = (id: number) => {
    this.setState((state) => ({
      adminList: state.adminList.filter((admin) => admin.id !== id),
    }));
  };

  render() {
    return (
      <>
        <Button type="primary" onClick={this.showAddAdminModal}>
          添加管理员
        </Button>
        <Table
          loading={this.state.loading}
          dataSource={this.state.adminList}
          rowKey={'id'}
          pagination={{ position: ['bottomCenter'], total: this.state.total, pageSize: this.state.pageSize, showSizeChanger: false }}
          onChange={this.change}
        >
          <Table.Column title={'ID'} dataIndex={'id'} />
          <Table.Column title={'姓名'} dataIndex={'name'} />
          <Table.Column title={'邮箱'} dataIndex={'email'} />
          <Table.Column title={'电话'} dataIndex={'mobile'} />
          <Table.Column
            title={'操作'}
            render={(admin: IAdmin) => (
              <Space>
                <Button type="primary">编辑</Button>
                <DeleteAdmin id={admin.id} deleteAdmin={this.deleteAdmin} />
              </Space>
            )}
          />
        </Table>
        <AddAdmin visible={this.state.showAddAdminModal} callback={this.hideAddModale} />
      </>
    );
  }
}
