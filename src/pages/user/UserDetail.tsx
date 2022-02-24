import { Button } from 'antd';
import { inject, observer } from 'mobx-react';
import React from 'react';
import UserStore from '../../store/UserStore';
interface IProps {
  userStore?: UserStore;
}

@inject('userStore')
@observer
class Index extends React.Component<IProps> {
  componentDidMount() {}
  changeName = () => {
    this.props.userStore?.changeName('Lee');
  };
  render() {
    return (
      <>
        <div>{this.props.userStore?.username}</div>
        <Button onClick={this.changeName} type="primary">
          修改姓名
        </Button>
      </>
    );
  }
}
export default Index;
