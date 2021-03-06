import React, { createRef, RefObject } from 'react';
import { Button, Form, FormInstance, Input, message, Modal, Space, Tree } from 'antd';
import { adminAdd } from '../../api/admin';
import { getAllPermission } from '../../api/permission';
import { IRole } from './RoleList';

interface IProps {
  visible: boolean;
  role?: IRole;
  callback: (refresh?: boolean) => void;
}
interface IState {
  nodeList: IPermission[];
  defaultCheckedKeys: number[];
}
interface IPermission {
  id: number;
  key: number;
  parentId: number;
  isMenu: number;
  title: string;
  path: string;
  children: IPermission[];
}
const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

export default class Index extends React.Component<IProps, IState> {
  formRef: RefObject<FormInstance>;

  constructor(props: IProps) {
    super(props);
    this.state = {
      nodeList: [],
      defaultCheckedKeys: [],
    };
    this.formRef = createRef<FormInstance>();
  }
  componentDidUpdate(prevProps: Readonly<IProps>, pervState: Readonly<IState>, snapshot?: any) {
    if (!prevProps.visible) {
      if (this.props.role && pervState.nodeList.length === 0) {
        console.log(111111111111111);
        this.getAllPermission();
      }
    }
  }

  generatePermissionList = (permissionList: IPermission[], parentId: number = 0) => {
    let pList: IPermission[] = [];
    permissionList.forEach((permission) => {
      if (permission.parentId === parentId) {
        permission.key = permission.id;
        permission.children = this.generatePermissionList(permissionList, permission.id);
        pList.push(permission);
      }
    });
    return pList;
  };
  getAllPermission = () => {
    getAllPermission().then((res) => {
      console.log(res);
      const { data } = res;
      let permissions = [2, 3];
      this.formRef.current?.setFieldsValue({ permissionList: permissions });
      this.setState({
        nodeList: this.generatePermissionList(data),
        defaultCheckedKeys: permissions,
      });
    });
  };
  editRole = (form: any) => {
    console.log(form);
    adminAdd(form).then((res) => {
      console.log(res);
      const { code, msg } = res as any;
      if (code === 200) {
        message.success(msg);
        this.formRef.current?.resetFields();
        this.cancel(true);
      } else {
        message.error(msg);
      }
    });
  };
  cancel = (ref?: boolean) => {
    this.setState({ nodeList: [], defaultCheckedKeys: [] });
    this.props.callback(ref);
  };
  onCheck = (checkedKeys: any) => {
    console.log(checkedKeys);
    this.formRef.current?.setFieldsValue({ permissionList: checkedKeys.checked });
  };

  render() {
    this.formRef.current?.setFieldsValue({ ...this.props.role });
    return (
      <Modal title="????????????" visible={this.props.visible} onCancel={() => this.cancel()} footer={null}>
        <Form ref={this.formRef} initialValues={{ roleName: '', permissionList: [] }} {...layout} onFinish={this.editRole}>
          <Form.Item
            shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
            label="????????????"
            name="roleName"
            rules={[
              {
                type: 'string',
                required: true,
                validator: (rule, value, callback) => {
                  if (value === undefined || value === '') {
                    return Promise.reject('????????????????????????');
                  }
                  if (value.length < 2) {
                    return Promise.reject(new Error('??????????????????????????????2???'));
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input />
          </Form.Item>
          {this.state.nodeList.length ? (
            <Form.Item
              shouldUpdate={(prevValues, curValues) => prevValues.additional !== curValues.additional}
              label="??????"
              name="permissionList"
              rules={[
                {
                  type: 'string',
                  min: 1,
                  required: true,
                  validator: (rule, value, callback) => {
                    if (!value || (value && value.length <= 0)) {
                      return Promise.reject('???????????????????????????');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Tree
                checkable
                defaultExpandAll
                checkStrictly
                showLine
                onCheck={this.onCheck}
                treeData={this.state.nodeList}
                defaultCheckedKeys={this.state.defaultCheckedKeys}
              />
            </Form.Item>
          ) : null}

          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                ???????????????
              </Button>
              <Button type="default" htmlType="reset">
                ??????
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
