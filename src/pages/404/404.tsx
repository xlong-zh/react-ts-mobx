import React from 'react';
import { Button, Result } from 'antd';

export default class Index extends React.Component {
  render() {
    return (
      <Result status="404" title="404" subTitle="Sorry, the page you visited does not exist." extra={<Button type="primary">Back Home</Button>} />
    );
  }
}
