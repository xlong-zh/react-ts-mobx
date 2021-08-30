import React, { createRef, RefObject } from 'react';
import { Form, FormInstance, Input } from 'antd';

import styles from './index.less';

export default class Login extends React.Component {
  formRef: RefObject<FormInstance>;
  constructor(props: any, context: any) {
    super(props, context);
    this.formRef = createRef<FormInstance>();
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <Form ref={this.formRef}>
          <Form.Item label="用户名" name="name">
            <Input />
          </Form.Item>
          <Form.Item label="密码" name="password">
            <Input.Password />
          </Form.Item>
        </Form>
      </>
    );
  }
}
