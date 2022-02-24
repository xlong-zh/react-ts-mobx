import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { deleteAdmin } from '../../api/admin';

interface IProps {
  id: number;
  callback: (id: number) => void;
}

export default class Index extends React.Component<IProps> {
  deleteRole = () => {
    deleteAdmin(this.props.id).then((res) => {
      console.log(res);
      const { code, msg } = res as any;
      if (code === 200) {
        message.success(msg);
        this.props.callback(this.props.id);
      } else {
        message.error(msg);
      }
    });
  };
  cancel = () => {
    message.info('取消删除');
  };

  componentDidMount() {}

  render() {
    return (
      <div>
        <Popconfirm title="删除管理员" onConfirm={this.deleteRole} onCancel={this.cancel}>
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      </div>
    );
  }
}
