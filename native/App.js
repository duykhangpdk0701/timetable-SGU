import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { HomeRoutes, LoginRoutes, WeekRoutes } from "./src/routes/route";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawer from "./src/components/CustomDrawer";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawer {...props} />}>
          <Drawer.Screen
            name={HomeRoutes.name}
            component={HomeRoutes.component}
          />
          <Drawer.Screen
            name={WeekRoutes.name}
            component={WeekRoutes.component}
          />

          <Drawer.Screen
            name={LoginRoutes.name}
            component={LoginRoutes.component}
            options={{
              drawerItemStyle: { height: 0 },
              headerShown: false,
            }}
          />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
