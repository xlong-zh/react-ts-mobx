import React from 'react';
import { Button, Space, Table } from 'antd';
import { getAdminList } from '../../api/admin';

// import styles from './index.less';

interface IAdmin {
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
  // hideOnSinglePage:boolean
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
      pageSize: 15,
      total: 0,
      loading: false,
    };
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
        pageSize: 10,
        total: 10,
      });
    });
  };
  change = (pagination: any) => {
    this.getAdminList(pagination.current);
  };
  componentDidMount() {
    this.getAdminList();
  }

  render() {
    return (
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
          render={() => (
            <Space>
              <Button type="primary">编辑</Button>
              <Button type="primary" danger>
                删除
              </Button>
            </Space>
          )}
        />
      </Table>
    );
  }
}
