import { NavigationContainer } from "@react-navigation/native";
import * as React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider as ReduxProvider } from "react-redux";
import configureStore from "./redux/store";
import Cart from "./screens/Cart";
import History from "./screens/History";
import Home from "./screens/Home";
import Map from "./screens/Map";
import OrderCompleted from "./screens/OrderCompleted";
import Profile from "./screens/Profile";
import Register from "./screens/Register";
import Reservation from "./screens/Reservation";
import RestaurantDetail from "./screens/RestaurantDetail";
import SignIn from "./screens/SignIn";

const store = configureStore();

export default function Navigation() {
  const Stack = createNativeStackNavigator();

  return (
    <ReduxProvider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SignIn"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="RestaurantDetail" component={RestaurantDetail} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="OrderCompleted" component={OrderCompleted} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Reservation" component={Reservation} />
          <Stack.Screen
            name="Map"
            component={Map}
            initialParams={{
              // tham so mac dinh
              location: [20.980652089221405, 105.78784534954742],
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ReduxProvider>
  );
}
