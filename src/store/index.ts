import UserStore from './UserStore';
import AdminStore from './AdminStore';
import PermissionStore from './PermissionStore';

const Store = {
  userStore: new UserStore(),
  AdminStore: new AdminStore(),
  PermissionStore: new PermissionStore(),
};
export default Store;
