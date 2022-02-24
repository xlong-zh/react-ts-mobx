import { action, makeAutoObservable, observable } from 'mobx';

export default class UserStore {
  @observable
  username: string = '';

  constructor(username: string = '111') {
    this.username = username;
    makeAutoObservable(this);
  }

  @action
  changeName = (name: string) => {
    this.username = name;
  };
}
