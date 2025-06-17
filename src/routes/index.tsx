import { useAuthStore } from "@stores/auth/authStore";
import DrawerNavigator from "./app/drawerNavigator";
import AuthRoutes from "./auth";

const Routes = () => {
  const { user } = useAuthStore();
  return user?.token ? <DrawerNavigator /> : <AuthRoutes />;
};

export default Routes;
