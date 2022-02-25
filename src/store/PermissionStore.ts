import { action, makeAutoObservable, runInAction } from 'mobx';
import { getAllPermission } from '../api/permission';
import { IRouter } from '../router';

export default class PermissionStore {
  permissionList: IRouter[] = [];
  state: string = 'loading';

  constructor() {
    makeAutoObservable(this);
  }

  @action
  initPermission = async () => {
    const permissionList = await getAllPermission().then((res) => {
      console.log('getAllPermission');
      console.log(res);
      return res.data;
    });
    runInAction(() => {
      this.permissionList = permissionList;
      this.state = 'success';
    });
  };
}
