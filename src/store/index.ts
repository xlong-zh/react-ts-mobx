import UserStore from './UserStore';
import AdminStore from './AdminStore';

const Store = {
  userStore: new UserStore(),
  AdminStore: new AdminStore(),
};
export default Store;
