import React, { createRef, RefObject } from 'react';
import { Button, Form, FormInstance, Input, message, Modal, Space } from 'antd';
import { IAdmin } from './AdminList';
import { adminAdd } from '../../api/admin';

interface IProps {
  visible: boolean;
  callback: (refresh?: boolean) => void;
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class Index extends React.Component<IProps> {
  formRef: RefObject<FormInstance>;

  constructor(props: IProps) {
    super(props);
    this.formRef = createRef<FormInstance>();
  }
  componentDidMount() {}

  adminAdd = (admin: IAdmin) => {
    adminAdd(admin).then((res) => {
      console.log(res);
      const { code, msg } = res as any;
      if (code === 200) {
        message.success(msg);
        this.formRef.current?.resetFields();
        this.props.callback(true);
      } else {
        message.error(msg);
      }
    });
  };
  cancel = () => {
    this.props.callback();
  };
  render() {
    return (
      <Modal title="添加管理员" visible={this.props.visible} onCancel={this.cancel} footer={null}>
        <Form ref={this.formRef} {...layout} onFinish={this.adminAdd}>
          <Form.Item label="用户名" name="name" rules={[{ type: 'string', required: true, message: '用户名不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="手机号" name="mobile" rules={[{ type: 'string', required: true, message: '手机号不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item label="邮箱" name="email" rules={[{ type: 'string', required: true, message: '邮箱不能为空' }]}>
            <Input />
          </Form.Item>
          <Form.Item
            label="密码"
            name="password"
            rules={[
              {
                type: 'string',
                validator: (rule, value, callback) => {
                  if (value === undefined || value === '') {
                    return Promise.resolve();
                  }
                  if (value.length < 6) {
                    return Promise.reject(new Error('密码长度不能小于6位'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                添加管理员
              </Button>
              <Button type="default" htmlType="reset">
                重置
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
