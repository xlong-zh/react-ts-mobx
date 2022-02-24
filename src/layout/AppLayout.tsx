import React from 'react';
import { Layout } from 'antd';
import SideMenu from './sideMenu/SideMenu';
import Crumb from './Crumb/Crumb';

const { Header, Content } = Layout;

export default class Index extends React.Component {
  render() {
    return (
      <Layout>
        <Header className="header">
          <div className="logo" />
        </Header>
        <Layout>
          <SideMenu />
          <Layout style={{ padding: '0 24px 24px' }}>
            <Crumb />
            <Content
              className="site-layout-background"
              style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              {this.props.children}
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}
