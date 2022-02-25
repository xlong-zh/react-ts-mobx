import React, { createRef, RefObject } from 'react';
import { Button, Form, FormInstance, Input, message, Space } from 'antd';
import styles from './login.module.scss';
import { login } from '../api/login';
// import { setLocal } from '../utils/storage';
import { inject, observer } from 'mobx-react';
import AdminStore from '../store/AdminStore';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  AdminStore?: AdminStore;
}

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 6, span: 16 },
};

@inject('AdminStore')
@observer
class Login extends React.Component<IProps> {
  formRef: RefObject<FormInstance>;
  constructor(props: IProps) {
    super(props);
    this.formRef = createRef<FormInstance>();
    // this.state = {};
  }

  componentDidMount() {}

  login = (form: any) => {
    login(form.name, form.password).then((response) => {
      console.log(response);
      const { code, msg, data } = response as any;
      if (code === 200) {
        this.props.AdminStore?.login(data.token);
        this.props.history.push('/');
        message.success(msg);
      } else {
        message.error(msg);
      }
    });
  };

  render() {
    return (
      <div className={styles.login_wrap}>
        <div className={styles.form_box}>
          <div className={styles.login_header}>react-ts-mbox</div>
          <Form className={styles.login_form} ref={this.formRef} {...layout} onFinish={this.login}>
            <Form.Item label="用户名" name="name" rules={[{ type: 'string', required: true, message: '请输入' }]}>
              <Input />
            </Form.Item>
            <Form.Item label="密码" name="password" rules={[{ type: 'string', required: true, message: '请输入' }]}>
              <Input.Password />
            </Form.Item>
            <Form.Item {...tailLayout}>
              <Space>
                <Button type="primary" htmlType="submit">
                  登录
                </Button>
                <Button type="primary" htmlType="reset">
                  重置
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
