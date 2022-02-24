import React from 'react';
import { Button, message, Popconfirm } from 'antd';
import { deleteAdmin } from '../../api/admin';

interface IProps {
  id: number;
  deleteAdmin: (id: number) => void;
}

export default class DeleteAdmin extends React.Component<IProps> {
  deleteAdmin = () => {
    deleteAdmin(this.props.id).then((res) => {
      console.log(res);
      const { code, msg } = res as any;
      if (code === 200) {
        message.success(msg);
        this.props.deleteAdmin(this.props.id);
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
        <Popconfirm title="删除管理员" onConfirm={this.deleteAdmin} onCancel={this.cancel}>
          <Button type="primary" danger>
            删除
          </Button>
        </Popconfirm>
      </div>
    );
  }
}
