import { createAppContainer, createStackNavigator } from "react-navigation";

import LoginScreen from "./src/pages/LoginScreen";

const AppNavigator = createStackNavigator(
  {
    Login: {
      navigationOptions: {
        title: "Bem Vindo!"
      },
      screen: LoginScreen
    }
  },
  {
    defaultNavigationOptions: {
      title: "Series!",
      headerStyle: {
        backgroundColor: "#6ca2f7",
        borderBottomWidth: 1,
        borderBottomColor: "#C5C5C5"
      },
      headerTintColor: "#FFF",
      headerTitleStyle: {
        color: "#FFF",
        fontSize: 30
      }
    }
  }
);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;
