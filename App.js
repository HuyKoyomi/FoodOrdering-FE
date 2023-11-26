import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import UserContext from "./src/context/UserContext";
import Navigation from "./src/Navigation";

export default function App() {
  const Stack = createNativeStackNavigator();
  const [user, setUser] = React.useState({});
  return (
    <UserContext.Provider value={[user, setUser]}>
      <Navigation />
    </UserContext.Provider>
  );
}
