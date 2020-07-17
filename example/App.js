// import React, { Component } from "react";
// import { Alert, Linking, Platform, StyleSheet, Text, View } from "react-native";
// import { createSwitchNavigator, createAppContainer } from "react-navigation";

// import InitialScreen from "./InitialScreen.js";
// import PlayerScreen from "./PlayerScreen.js";

// const App = createSwitchNavigator({
//   initial: { screen: InitialScreen },
//   player: { screen: PlayerScreen },
// });

// const AppContainer = createAppContainer(App);

// export default AppContainer;

import React, { Component } from "react";
import { Alert, Linking, Platform, StyleSheet, Text, View } from "react-native";
import { createSwitchNavigator, createStackNavigator, createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { FontAwesome5 } from "@expo/vector-icons";

import QueueScreen from "./screens/queueScreen";
import PlayerScreen from "./screens/playerScreen";
import SearchScreen from "./screens/searchScreen";
import HomePage from "./screens/homePage";
import LoginPage from "./screens/loginPage";
import { ProfileScreen } from "./screens";
import AddButton from "./components/AddButton";

const TabNavigator = createBottomTabNavigator(
  {
      Queue: {
          screen: QueueScreen,
          navigationOptions: {
              tabBarIcon: () => <FontAwesome5 name="book-medical" size={24} color="#CDCCCE" />
          }
      },
      Add: {
          screen: () => null,
          navigationOptions: {
              tabBarIcon: <AddButton />
          }
      },
      Profile: {
          screen: ProfileScreen,
          navigationOptions: {
              tabBarIcon: () => <FontAwesome5 name="user" size={24} color="#CDCCCE" />
          }
      }
  },
  {
      tabBarOptions: {
          showLabel: true
      }
  }
);

const CodeNavigaor = createSwitchNavigator({
  player: { screen: TabNavigator },
  search: { screen: SearchScreen }
});

const LoginNavigator = createSwitchNavigator({
  initial: { screen: LoginPage },
  player: { screen: TabNavigator },
  search: { screen: SearchScreen }
});

const App = createStackNavigator(
  {
    routeHomePage: HomePage,
    routeLoginPage: LoginNavigator,
    routeQueuePage: CodeNavigaor,
  },
  {
    initialRouteName: "routeHomePage",
  }
);

const AppContainer = createAppContainer(App);

export default AppContainer;
