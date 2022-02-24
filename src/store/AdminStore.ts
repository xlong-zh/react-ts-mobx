import { action, makeAutoObservable, observable, runInAction } from 'mobx';
import { getAdminInfo } from '../api/login';
import { setLocal, rmLocal } from '../utils/storage';

interface IAdmin {
  id: number;
  name: string;
  avatar: string;
}

export default class AdminStore {
  @observable
  admin: IAdmin;

  constructor(admin: IAdmin = { id: 0, name: 'admin', avatar: '' }) {
    this.admin = admin;
    makeAutoObservable(this);
  }

  @action
  logout = () => {
    this.admin = { id: 0, name: '', avatar: '' };
    rmLocal('token');
  };

  @action
  login = (token: string) => {
    setLocal('token', token);
  };
  @action
  initAdmin = async () => {
    const admin = await getAdminInfo().then((res) => {
      console.log(res);
      return res.data;
    });
    runInAction(() => {
      this.admin = admin;
    });
  };
}
